import { Socket } from "socket.io";
import { WebRTCCallIceCandidatePayload } from "../../types/webrtc.types";
import logger from "@rizlax/logs";

export class CallCandidateEvent {
  public handle(socket: Socket, payload: WebRTCCallIceCandidatePayload): void {
    try {
      const { targetUserId, candidate } = payload;

      socket.to(targetUserId).emit("call:candidate", {
        fromUserId: socket.data.userId,
        candidate,
      });

      logger.info(
        `ICE candidate sent from ${socket.data.userId} to ${targetUserId}`
      );
    } catch (error) {
      logger.error("Error handling call:candidate event", error);
    }
  }
}
