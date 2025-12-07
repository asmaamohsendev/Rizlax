import { Router } from "express";
import NotificationsController from "../controllers/notifications.controller.ts";
import { AuthGuard } from "@rizlax/common-middleware";
import { AdminOnly } from "../middleware/adminOnly.ts";

interface INotificationsController {
  getStats: typeof NotificationsController.prototype.getStats;
  getPlatformAnalytics: typeof NotificationsController.prototype.getPlatformAnalytics;
  getEntityBreakdown: typeof NotificationsController.prototype.getEntityBreakdown;
  getAllNotifications: typeof NotificationsController.prototype.getAllNotifications;
  getNotificationById: typeof NotificationsController.prototype.getNotificationById;
  deleteNotification: typeof NotificationsController.prototype.deleteNotification;
  markAsRead: typeof NotificationsController.prototype.markAsRead;
}

export default function createNotificationsRouter(
  NotificationsController: INotificationsController
): Router {
  const router = Router();

  // Stats and analytics routes (should come before :id routes)
  router.get(
    "/stats",
    AuthGuard,
    AdminOnly,
    NotificationsController.getStats.bind(NotificationsController)
  );

  router.get(
    "/analytics",
    AuthGuard,
    AdminOnly,
    NotificationsController.getPlatformAnalytics.bind(NotificationsController)
  );

  router.get(
    "/entity/:entity",
    AuthGuard,
    AdminOnly,
    NotificationsController.getEntityBreakdown.bind(NotificationsController)
  );

  // CRUD routes
  router
    .route("/")
    .get(
      AuthGuard,
      AdminOnly,
      NotificationsController.getAllNotifications.bind(NotificationsController)
    );

  router
    .route("/:id")
    .get(
      AuthGuard,
      AdminOnly,
      NotificationsController.getNotificationById.bind(NotificationsController)
    )
    .delete(
      AuthGuard,
      AdminOnly,
      NotificationsController.deleteNotification.bind(NotificationsController)
    );

  router.patch(
    "/:id/read",
    AuthGuard,
    AdminOnly,
    NotificationsController.markAsRead.bind(NotificationsController)
  );

  return router;
}