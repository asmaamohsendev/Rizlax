import { Router } from "express";
import MessageController from "../controllers/message.controller";
import { AuthGuard } from "@rizlax/common-middleware";

export const createMessageRouter = (
  messageController: MessageController
): Router => {
  const router = Router();

  router.use(AuthGuard);

  const bindHandler = (handler: Function) => handler.bind(messageController);

  router.get(
    "/conversation/:conversationId/messages",
    bindHandler(messageController.getMessages)
  );

  return router;
}   