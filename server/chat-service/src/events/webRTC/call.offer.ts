import { Socket } from "socket.io";
import { WebRTCCallOfferPayload } from "../../types/webrtc.types";
import logger from "@rizlax/logs";

export const CallOfferEvent = async (socket: Socket, payload: WebRTCCallOfferPayload) => {
    try {
      socket.to(payload.data.toUserId).emit("call:offer", payload);
      logger.info(
        `Call offer sent from ${payload.data.fromUserId} to ${payload.data.toUserId}`
      );
    } catch (error) {
        logger.error("Error handling call offer event:", error);
        socket.emit("error", { message: "Failed to process call offer" });
    }
  }


