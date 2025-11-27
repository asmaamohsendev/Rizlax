import { Server as httpServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { verifyToken } from "@rizlax/common-middleware";
import logger from "@rizlax/logs";
import { onJoinConversation } from "../events/onJoinConversation.ts";
import { onMessage } from "../events/onMessage.ts";
import { onTyping } from "../events/onTyping.ts";
import { onReadReceipt } from "../events/onReadReceipt.ts";
import { onStopTyping } from "../events/onStopTyping.ts";
import { onDisconnect } from "../events/onDisconnect.ts";
import { CallOfferEvent } from "../events/webRTC/call.offer.ts";

interface SocketServerOptions {
  port: number;
  httpServer?: httpServer;
}

class SocketServer {
  private io: SocketIOServer;
  private port: number;
  private hasHttpServer: boolean;

  constructor(options: SocketServerOptions) {
    this.port = options.port;
    this.hasHttpServer = !!options.httpServer;

    this.io = new SocketIOServer(options.httpServer ?? undefined, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    this.initializeMiddlewares();
    this.initializeEvents();
  }

  private initializeMiddlewares() {
    this.io.use(async (socket, next) => {
      const token = socket.handshake.auth?.token;
      try {
        const decoded = await verifyToken(token);
        console.log("✅ Decoded payload:", decoded);
        socket.data.user = decoded;
        next();
      } catch (error) {
        console.error("❌ JWT verification failed:", error);
        next(new Error("Authentication error"));
      }
    });
  }

  private initializeEvents() {
    this.io.on("connection", async (socket: Socket) => {
      onJoinConversation(socket);
      onMessage(this.io, socket);
      onTyping(socket);
      onReadReceipt(this.io, socket);
      onStopTyping(socket);
      onDisconnect(socket);

      socket.on("call:offer", async (payload) => {
        await CallOfferEvent(socket, payload);
      });

      socket.on("call:answer", async (payload) => {
        socket.to(payload.targetUserId).emit("call:answer", payload);
      });

      socket.on("call:ice-candidate", async (payload) => {
        socket.to(payload.targetUserId).emit("call:ice-candidate", payload);
      });

      socket.on("call:ringing", async (payload) => {
        socket.to(payload.targetUserId).emit("call:ringing", payload);
      });

      socket.on("call:mute", async (payload) => {
        socket.to(payload.targetUserId).emit("call:mute", payload);
      });

      socket.on("call:reject", async (payload) => {
        socket.to(payload.targetUserId).emit("call:reject", payload);
      });

      socket.on("call:end", async (payload) => {
        socket.to(payload.targetUserId).emit("call:end", payload);
      });
      

    });
  }

  public listen() {
    if (this.hasHttpServer) {
      logger.info(`Socket.IO server is running with existing HTTP server.`);
    } else {
      this.io.listen(this.port);
      logger.info(`Socket.IO server is running on port ${this.port}`);
    }
  }
}

export default SocketServer;
