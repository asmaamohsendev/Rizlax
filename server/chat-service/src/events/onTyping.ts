import { Socket } from "socket.io";

export const onTyping = (socket: Socket) => {
  socket.on("typing", (conversationId: string) => {
    socket.to(conversationId).emit("typing", {
      conversationId,
      userId: socket.data.user.userId,
    });
  });
};
