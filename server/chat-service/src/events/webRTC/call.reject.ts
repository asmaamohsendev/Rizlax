import { Socket } from "socket.io";
import { WebRTCRejectCallPayload } from "../../types/webrtc.types";
import logger from "@rizlax/logs";

export class CallRejectEvent {
  public handle(socket: Socket, payload: WebRTCRejectCallPayload): void {
    try {
      const { callId, targetUserId, reason } = payload;

      socket.to(targetUserId).emit("call:reject", {
        fromUserId: socket.data.userId,
        callId,
        reason,
      });

      logger.info(`Call rejected from ${socket.data.userId} to ${targetUserId}`);
    } catch (error) {
      logger.error("Error handling call:reject event", error);
    }
  }
}