import logger from "@rizlax/logs";
import { Socket } from "socket.io";

export const onDisconnect = async (socket: Socket) => {
  socket.on("disconnect", async () => {
    logger.info(`User disconnected from conversation`);
  });
};
