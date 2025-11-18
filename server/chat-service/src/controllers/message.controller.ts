import type { Request, Response } from "express";
import { DomainError } from "@rizlax/common-middleware";
import type { Message } from "@prisma/client";
import AttachmentService from "../services/attachment.service.ts";
import logger from "@rizlax/logs";

type AuthReq = Request & { userId: string };

export interface IMessageService {
  getMessages: (conversationId: string, limit?: number) => Promise<Message[]>;
}

class MessageController {
  private messageService: IMessageService;
  private attachmentService: AttachmentService;

  constructor(
    messageService: IMessageService,
    attachmentService: AttachmentService
  ) {
    this.messageService = messageService;
    this.attachmentService = attachmentService;
  }

  private handleError(err: unknown, res: Response) {
    if (err instanceof DomainError) {
      return res
        .status(err.statusCode)
        .json({ message: err.message, code: err.code });
    }

    logger.error("Unexpected error in MessageController", err);
    return res.status(500).json({ message: "Internal server error" });
  }

  private validateUserAccess(message: Message | null, userId: string) {
    if (!message) {
      throw new DomainError("Message not found", "MESSAGE_NOT_FOUND", 404);
    }

    if (message.senderId !== userId && message.receiverId !== userId) {
      throw new DomainError("Access denied", "ACCESS_DENIED", 403);
    }
  }

  public async getMessages(req: AuthReq, res: Response) {
    try {
      const { conversationId } = req.params;
      const limit = req.query.limit
        ? parseInt(req.query.limit as string, 10)
        : 50;

      if (!conversationId) {
        throw new DomainError(
          "conversationId is required",
          "MISSING_CONVERSATION_ID",
          400
        );
      }

      const messages = await this.messageService.getMessages(
        conversationId,
        limit
      );

      // Validate user access for each message
      messages.forEach((message) =>
        this.validateUserAccess(message, req.userId)
      );

      return res.status(200).json(messages);
    } catch (err) {
      return this.handleError(err, res);
    }
  }

}

export default MessageController;
