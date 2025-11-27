import { Socket } from "socket.io";
import { prisma } from "@rizlax/db-client";
import logger from "@rizlax/logs";
import ContentModerationService from "../services/contentModeration.service";

export const onMessage = (io, socket: Socket) => {
  socket.on("message", async (data) => {
    try {
      const { conversationId, content, attachments, receiverId } = data;
      logger.info(`New message for conversation ${conversationId}`);
      
      const moderationService = new ContentModerationService();

      // Check content moderation before processing
      const result = await moderationService.moderateContent(
        socket.data.user.userId,
        content
      );

      if (result.violated) {
        logger.warn(
          `Message blocked for user ${socket.data.user.userId}: ${result.violationType}, action: ${result.action}`
        );
        
        // Send structured error to client
        socket.emit("message_error", {
          success: false,
          error: {
            code: "CONTENT_VIOLATION",
            message: "Your message violates our community guidelines",
            details: {
              violationType: result.violationType,
              action: result.action,
              timestamp: new Date().toISOString()
            }
          }
        });
        return;
      }

      // Content is safe - create and send message
      const message = await prisma.message.create({
        data: {
          conversationId,
          senderId: socket.data.user.userId,
          receiverId,
          content,
          attachments,
        },
        include: {
          sender: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              profilePicture: true
            }
          },
          conversation: true,
        },
      });

      // Emit successful message to conversation room
      io.to(conversationId).emit("new_message", {
        success: true,
        message: {
          id: message.id,
          conversationId: message.conversationId,
          content: message.content,
          attachments: message.attachments,
          senderId: message.senderId,
          sender: message.sender,
          timestamp: message.createdAt.toISOString(),
        }
      });

      // Confirm to sender
      socket.emit("message_sent", {
        success: true,
        messageId: message.id,
        timestamp: message.createdAt.toISOString()
      });

      logger.info(`Message ${message.id} sent successfully in conversation ${conversationId}`);

    } catch (error) {
      logger.error(`Error processing message: ${error}`);
      
      // Send generic error to client
      socket.emit("message_error", {
        success: false,
        error: {
          code: "SERVER_ERROR",
          message: "Failed to send message. Please try again.",
          details: {
            timestamp: new Date().toISOString()
          }
        }
      });
    }
  });
};
