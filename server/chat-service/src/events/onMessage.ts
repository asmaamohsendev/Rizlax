import { Socket } from "socket.io";
import { prisma } from "@rizlax/db-client";
import logger from "@rizlax/logs";

export const onMessage = (io, socket: Socket) => {
  socket.on("message", async (data) => {
    const { conversationId, content, attachments } = data;
    logger.info(`New message for conversation ${conversationId}`);

    await prisma.message.create({
      data: {
        conversationId,
        senderId: socket.data.user.userId,
        receiverId: data.receiverId,
        content,
        attachments,
      },
      include: {
        sender: true,
        conversation: true,
      },
    });

    io.to(conversationId).emit("new_message", {
      conversationId,
      content,
      attachments,
      senderId: socket.data.user.userId,
      timestamp: new Date().toISOString(),
    });
  });
};
