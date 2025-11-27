import { Socket } from "socket.io";
import { WebRTCCallEndPayload } from "../../types/webrtc.types";
import logger from "@rizlax/logs";

export const CallEndEvent = async (socket: Socket, payload: WebRTCCallEndPayload) => {
    try {
      const { callId, targetUserId, reason } = payload;

      socket.to(targetUserId).emit("call:end", {
        fromUserId: socket.data.userId,
        callId,
        reason,
      });

      logger.info(`Call ended from ${socket.data.userId} to ${targetUserId}`);
    } catch (error) {
      logger.error("Error handling call:end event", error);
    }
  }
