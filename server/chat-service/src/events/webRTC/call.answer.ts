import { Socket } from "socket.io";
import { WebRTCCallAnswerPayload } from "../../types/webrtc.types.ts";
import logger from "@rizlax/logs";

export class CallAnswerHandler {
  public handle(socket: Socket, payload: WebRTCCallAnswerPayload): void {
    try {
      const { targetUserId, answer } = payload;
      socket.to(targetUserId).emit("call:answer", {
        fromUserId: socket.data.userId,
        answer,
      });

      logger.info(
        `Call answer sent from ${socket.data.userId} to ${targetUserId}`
      );
    } catch (error) {
      this.handleError(socket, error);
    }
  }
  private handleError(socket: Socket, error: unknown): void {
    logger.error("Error handling call answer:", error);
    socket.emit("error", { message: "Failed to process call answer" });
  }
}
