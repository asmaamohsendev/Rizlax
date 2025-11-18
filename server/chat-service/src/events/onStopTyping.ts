import { Socket } from "socket.io";

export const onStopTyping = (socket: Socket) => {
  socket.on("stop_typing", (conversationId: string) => {
    socket.to(conversationId).emit("stop_typing", {
      conversationId,
      userId: socket.data.user.userId,
    });
  });
};
