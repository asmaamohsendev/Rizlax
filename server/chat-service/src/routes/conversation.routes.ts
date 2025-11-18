import { Router } from "express";
import ConversationController from "../controllers/conversation.controller.ts";
import MessageController from "../controllers/message.controller.ts";
import { AuthGuard } from "@rizlax/common-middleware";

export const createConversationRouter = (
  conversationController: ConversationController,
  messageController: MessageController
): Router => {
  const router = Router();

  router.use(AuthGuard);

  const bindHandler = (handler: Function) => handler.bind(conversationController);

  router.post("/", bindHandler(conversationController.createConversation));
  router.get("/:conversationId", bindHandler(conversationController.getConversationById));
  router.get("/", bindHandler(conversationController.getUserConversations));
  router.get("/:conversationId/messages", bindHandler(messageController.getMessages));

  return router;
}