import type { Request, Response } from "express";
import { DomainError } from "@rizlax/common-middleware";
import type { Conversation } from "@prisma/client";
import type { CreateConversationDTO } from "../services/conversation.service";
import logger from "@rizlax/logs";

type AuthReq = Request & { userId: string };

export interface IConversationService {
  createConversation: (data: CreateConversationDTO) => Promise<Conversation>;
  getConversationById: (id: string) => Promise<Conversation | null>;
  getUserConversations: (userId: string) => Promise<Conversation[]>;
}

class ConversationController {
  private conversationService: IConversationService;

  constructor(conversationService: IConversationService) {
    this.conversationService = conversationService;
  }

  private handleError(err: unknown, res: Response) {
    if (err instanceof DomainError) {
      return res
        .status(err.statusCode)
        .json({ message: err.message, code: err.code });
    }

    logger.error("Unexpected error in ConversationController", err);
    return res.status(500).json({ message: "Internal server error" });
  }

  private validateUserAccess(
    conversation: (Conversation & { participants?: { userId: string }[] }) | null,
    userId: string
  ) {
    if (!conversation) {
      throw new DomainError(
        "Conversation not found",
        "CONVERSATION_NOT_FOUND",
        404
      );
    }

    const participants = conversation.participants ?? [];
    const isParticipant = participants.some(
      (participant: { userId: string }) => participant.userId === userId
    );

    if (!isParticipant) {
      throw new DomainError("Access denied", "ACCESS_DENIED", 403);
    }
  }

  public async createConversation(req: AuthReq, res: Response) {
    try {
      const { participantIds, title } = req.body;

      if (!participantIds || !Array.isArray(participantIds) || participantIds.length === 0) {
        throw new DomainError(
          "participantIds must be a non-empty array",
          "INVALID_PARTICIPANT_IDS",
          400
        );
      }

      if (!participantIds.includes(req.userId)) {
        participantIds.push(req.userId);
      }

      const conversation = await this.conversationService.createConversation({
        participantIds,
        title,
      });

      return res.status(201).json(conversation);
    } catch (err) {
      return this.handleError(err, res);
    }
  }

    public async getConversationById(req: AuthReq, res: Response) {
        try {
            const { id } = req.params;
            const conversation = await this.conversationService.getConversationById(id);
            this.validateUserAccess(conversation, req.userId);
            return res.status(200).json(conversation);
        } catch (err) {
            return this.handleError(err, res);
        }
    }

    public async getUserConversations(req: AuthReq, res: Response) {
        try {
            const conversations = await this.conversationService.getUserConversations(req.userId);
            return res.status(200).json(conversations);
        } catch (err) {
            return this.handleError(err, res);
        }
    }

}

export default ConversationController;
