import { Request, Response, NextFunction } from "express";
import NotificationsService from "../services/notifications.service";
import { DomainError } from "@rizlax/common-middleware";

class NotificationsController {
  private notificationsService: NotificationsService;

  constructor() {
    this.notificationsService = new NotificationsService();
  }

  public getNotificationById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;

      if (!id) {
        throw new DomainError("NOTIFICATION_CONTROLLER_GET_NOTIFICATION_BY_ID", "NOTIFICATION_ID_REQUIRED", 400);
      }

      const notification = await this.notificationsService.getNotificationById(id);

      if (!notification) {
        throw new DomainError("NOTIFICATION_CONTROLLER_GET_NOTIFICATION_BY_ID", "NOTIFICATION_NOT_FOUND", 404);
      }

      res.status(200).json({
        success: true,
        data: notification,
      });
    } catch (error) {
      next(error);
    }
  };

  public getAllNotifications = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const {
        page,
        limit,
        userId,
        isRead,
        search,
        sortBy,
        sortOrder,
      } = req.query;

      const params = {
        page: page ? parseInt(page as string) : undefined,
        limit: limit ? parseInt(limit as string) : undefined,
        userId: userId as string,
        isRead: isRead === "true" ? true : isRead === "false" ? false : undefined,
        search: search as string,
        sortBy: sortBy as "createdAt" | "title" | undefined,
        sortOrder: sortOrder as "asc" | "desc" | undefined,
      };

      const result = await this.notificationsService.getAllNotifications(params);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  public deleteNotification = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;

      if (!id) {
        throw new DomainError("NOTIFICATION_CONTROLLER_DELETE_NOTIFICATION", "NOTIFICATION_ID_REQUIRED", 400);
      }

      const deletedNotification = await this.notificationsService.deleteNotification(id);

      res.status(200).json({
        success: true,
        message: "Notification deleted successfully",
        data: deletedNotification,
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes("Record to delete does not exist")) {
        next(new DomainError("NOTIFICATION_CONTROLLER_DELETE_NOTIFICATION", "NOTIFICATION_NOT_FOUND", 404));
      } else {
        next(error);
      }
    }
  };

  public markAsRead = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;

      if (!id) {
        throw new DomainError("NOTIFICATION_CONTROLLER_MARK_AS_READ", "NOTIFICATION_ID_REQUIRED", 400);
      }

      const updatedNotification = await this.notificationsService.markAsRead(id);

      res.status(200).json({
        success: true,
        message: "Notification marked as read",
        data: updatedNotification,
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes("Record to update not found")) {
        next(new DomainError("NOTIFICATION_CONTROLLER_MARK_AS_READ", "NOTIFICATION_NOT_FOUND", 404));
      } else {
        next(error);
      }
    }
  };

  public getStats = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const stats = await this.notificationsService.getStats();

      res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error) {
      next(error);
    }
  };

  public getPlatformAnalytics = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const analytics = await this.notificationsService.getPlatformAnalytics();

      res.status(200).json({
        success: true,
        data: analytics,
      });
    } catch (error) {
      next(error);
    }
  };

  public getEntityBreakdown = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { entity } = req.params;

      if (!entity) {
        throw new DomainError("NOTIFICATION_CONTROLLER_GET_ENTITY_BREAKDOWN","ENTITY_PARAMETER_REQUIRED", 400);
      }

      const breakdown = await this.notificationsService.getEntityBreakdown(entity);

      res.status(200).json({
        success: true,
        data: breakdown,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default NotificationsController;