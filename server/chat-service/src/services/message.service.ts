// Message service for handling chat messages sent ,recieve and update
import { prisma } from "@rizlax/db-client";
import type { Message, Prisma } from "@prisma/client";

export interface SendMessageDTO {
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
}

type FullMessageById = Prisma.MessageGetPayload<{
  include: {
    sender: true;
    conversation: true;
  };
}>;

class MessageService {
  public async getMessages(
    conversationId: string,
    limit = 50
  ): Promise<FullMessageById[]> {
    return prisma.message.findMany({
      where: { conversationId },
      include: { sender: true, conversation: true },
      orderBy: { createdAt: "asc" },
      take: limit,
    });
  }
}

export default MessageService;