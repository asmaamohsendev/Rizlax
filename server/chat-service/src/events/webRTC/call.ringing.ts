import { Socket } from "socket.io";
import { WebRTCCallRingingPayload } from "../../types/webrtc.types";
import logger from "@rizlax/logs";

export class CallRingingEvent {
  public handle(socket: Socket, payload: WebRTCCallRingingPayload): void {
    try {
      const { callId, targetUserId } = payload;

      socket.to(targetUserId).emit("call:ringing", {
        fromUserId: socket.data.userId,
        callId,
      });
    } catch (error) {
      logger.error("Error handling call:ringing event", error);
    }
  }
}
