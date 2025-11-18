import {prisma} from "@rizlax/db-client"
import type { Conversation, Prisma } from "@prisma/client"

export interface CreateConversationDTO {
  participantIds: string[]
  title?: string
}

type FullConversationById = Prisma.ConversationGetPayload<{
  include: {
    participants: true
    lastMessage: true
  }
}>

class ConversationService {
  public async createConversation(
    data: CreateConversationDTO
  ): Promise<Conversation> {

    const exsistingConversation = await prisma.conversation.findFirst({
      where: {
        participants: {
          every: {
            userId: {
              in: data.participantIds,
            },
          },
        },
      },
      include: {
        participants: true,
      },
    })

    if (exsistingConversation) {
      return exsistingConversation
    }

    return prisma.conversation.create({
      data: {
        title: data.title,
        participants: {
          create: data.participantIds.map((userId) => ({
            userId,
          })),
        },
      },
      include: {
        participants: true,
      },
    })
  }

  public async getConversationById(id: string): Promise<FullConversationById | null> {
    return prisma.conversation.findUnique({
      where: { id },
      include: {
        participants: true,
        lastMessage: true,
      },
    })
  }

  public async getUserConversations(userId: string): Promise<FullConversationById[]> {
    return prisma.conversation.findMany({
      where: {
        participants: {
          some: {
            userId,
          },
        },
      },
      include: {
        participants: true,
        lastMessage: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    })
  }
}

export default ConversationService