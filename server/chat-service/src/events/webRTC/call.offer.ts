import { Socket } from "socket.io";
import { WebRTCCallOfferPayload } from "../../types/webrtc.types";
import logger from "@rizlax/logs";

export class CallOfferEvent {
  public handle(socket: Socket, payload: WebRTCCallOfferPayload): void {
    try {
      socket.to(payload.data.toUserId).emit("call:offer", payload);
      logger.info(
        `Call offer sent from ${payload.data.fromUserId} to ${payload.data.toUserId}`
      );
    } catch (error) {
        this.handleError(socket, error);
    }
  }

  private handleError(socket: Socket, error: unknown): void {
    logger.error("Error handling call offer event:", error);
    socket.emit("error", { message: "Failed to process call offer" });
  }
}

export const callOfferEvent = new CallOfferEvent();
