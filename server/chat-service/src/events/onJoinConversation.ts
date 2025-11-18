import { Socket } from "socket.io";
import logger from "@rizlax/logs";
import { redis } from "@rizlax/redis";

export const onJoinConversation = (socket: Socket) => {
  socket.on("join_conversation", async (conversationId: string) => {
    socket.join(conversationId);
    logger.info(`User joined conversation: ${conversationId}`);

    const userId = socket.data.user.userId;
    const client = redis.getClient();
    await client.sAdd(`conversation:${conversationId}:participants`, userId);
  });
};
