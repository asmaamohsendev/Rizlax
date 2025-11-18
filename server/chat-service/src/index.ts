import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

import { redis } from "@rizlax/redis";
import APIServer from "./servers/api.server.ts";
import SocketServer from "./servers/socket.server.ts";
import logger from "@rizlax/logs";

import ConversationService from "./services/conversation.service.ts";
import ConversationController from "./controllers/conversation.controller.ts";
import { createConversationRouter } from "./routes/conversation.routes.ts";
import MessageService from "./services/message.service.ts";
import MessageController from "./controllers/message.controller.ts";
import AttachmentService from "./services/attachment.service.ts";

const API_PORT = Number(process.env.CHAT_PORT);
const SOCKET_PORT = Number(process.env.CHAT_SOCKET_PORT);

async function startServers() {
  try {
    await redis.connect();

    const conversationService = new ConversationService();
    const conversationController = new ConversationController(
      conversationService
    );

    const messageService = new MessageService();
    const attachmentService = new AttachmentService();
    const messageController = new MessageController(messageService, attachmentService);
    const conversationRouter = createConversationRouter(conversationController, messageController);

    const routers = [
      { path: "/api/conversations", router: conversationRouter },
    ];

    const apiServer = new APIServer(API_PORT, routers);
    const socketServer = new SocketServer({ port: SOCKET_PORT });

    await apiServer.listen();
    socketServer.listen();

    logger.info(`🚀 Chat Service is running on port ${API_PORT}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    logger.error(`Failed to start servers: ${message}`);
    process.exit(1);
  }
}

startServers();
