import { Socket } from "socket.io";

export const onReadReceipt = (io, socket: Socket) => {
  socket.on("read_receipt", (data) => {
    const { conversationId, messageId } = data;
    io.to(conversationId).emit("read_receipt", {
      conversationId,
      messageId,
      userId: socket.data.user.userId,
      timestamp: new Date().toISOString(),
    });
  });
};
