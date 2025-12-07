import { prisma } from "@rizlax/db-client";
import type { Notification } from "@prisma/client";
import { NotificationType, NotificationEntity } from "@prisma/client";
import logger from "@rizlax/logs";
import { group } from "console";

interface GetAllNotificationsParams {
  page?: number;
  limit?: number;
  userId?: string;
  isRead?: boolean;
  search?: string;
  sortBy?: "createdAt" | "title";
  sortOrder?: "asc" | "desc";
}

interface PaginatedNotificationsResponse {
  notifications: Notification[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

class NotificationsService {
  public async getNotificationById(
    notificationId: string
  ): Promise<Notification | null> {
    try {
      const notification = await prisma.notification.findUnique({
        where: { id: notificationId },
      });

      if (!notification || notification.type !== NotificationType.ADMIN) {
        return null;
      }

      return notification;
    } catch (error) {
      logger.error(`Error fetching notification by ID: ${error}`);
      throw error;
    }
  }

  public async getAllNotifications(
    params: GetAllNotificationsParams = {}
  ): Promise<PaginatedNotificationsResponse> {
    try {
      const {
        page = 1,
        limit = 10,
        userId,
        isRead,
        search,
        sortBy = "createdAt",
        sortOrder = "desc",
      } = params;

      const skip = (page - 1) * limit;

      // Build where clause for filtering
      const where: any = {};

      if (userId) {
        where.userId = userId;
      }

      if (typeof isRead === "boolean") {
        where.isRead = isRead;
      }

      if (search) {
        where.OR = [
          { title: { contains: search, mode: "insensitive" } },
          { message: { contains: search, mode: "insensitive" } },
        ];
      }

      const [total, notifications] = await Promise.all([
        prisma.notification.count({ where: { type: NotificationType.ADMIN } }),
        prisma.notification.findMany({
          where: { ...where, type: NotificationType.ADMIN },
          orderBy: { [sortBy]: sortOrder },
          skip,
          take: limit,
        }),
      ]);

      const totalPages = Math.ceil(total / limit);

      return {
        notifications,
        pagination: {
          total,
          page,
          limit,
          totalPages,
        },
      };
    } catch (error) {
      logger.error(`Error fetching notifications: ${error}`);
      throw error;
    }
  }

  public async deleteNotification(
    notificationId: string
  ): Promise<Notification> {
    try {
      const deletedNotification = await prisma.notification.delete({
        where: { id: notificationId },
      });
      return deletedNotification;
    } catch (error) {
      logger.error(`Error deleting notification: ${error}`);
      throw error;
    }
  }

  public async markAsRead(notificationId: string): Promise<Notification> {
    try {
      const updatedNotification = await prisma.notification.update({
        where: { id: notificationId },
        data: { isRead: true },
      });
      return updatedNotification;
    } catch (error) {
      logger.error(`Error marking notification as read: ${error}`);
      throw error;
    }
  }

  public async getStats(): Promise<{
    total: number;
    read: number;
    unread: number;
  }> {
    try {
      const total = await prisma.notification.count({
        where: { type: NotificationType.ADMIN },
      });
      const read = await prisma.notification.count({
        where: { type: NotificationType.ADMIN, isRead: true },
      });
      const unread = total - read;

      return { total, read, unread };
    } catch (error) {
      logger.error(`Error fetching notification stats: ${error}`);
      throw error;
    }
  }

  public async getPlatformAnalytics(): Promise<{
    overview: {
      total: number;
      read: number;
      unread: number;
    };
    byEntity: Array<{
      entity: string;
      total: number;
      read: number;
      unread: number;
      percentage: number;
    }>;
    byType: Array<{
      type: string;
      total: number;
      read: number;
      unread: number;
    }>;
    trends: {
      last24Hours: number;
      last7Days: number;
      last30Days: number;
    };
  }> {
    try {
      // TODO: Add Redis caching here
      // const cacheKey = 'platform:analytics:notifications';
      // const cached = await redis.get(cacheKey);
      // if (cached) return JSON.parse(cached);

      const now = new Date();
      const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      const [notifications, trends24h, trends7d, trends30d] = await Promise.all(
        [
          // Get all notifications with entity and type info
          prisma.notification.findMany({
            where: { type: NotificationType.ADMIN },
            select: {
              entity: true,
              type: true,
              isRead: true,
            },
          }),
          // Trend queries
          prisma.notification.count({
            where: {
              type: NotificationType.ADMIN,
              createdAt: { gte: last24Hours },
            },
          }),
          prisma.notification.count({
            where: {
              type: NotificationType.ADMIN,
              createdAt: { gte: last7Days },
            },
          }),
          prisma.notification.count({
            where: {
              type: NotificationType.ADMIN,
              createdAt: { gte: last30Days },
            },
          }),
        ]
      );

      const total = notifications.length;
      const read = notifications.filter((n) => n.isRead).length;
      const unread = total - read;

      // Group by entity
      //   const entityGroups = notifications.reduce((acc, notif) => {
      //     const entity = notif.entity;
      //     if (!acc[entity]) {
      //       acc[entity] = { total: 0, read: 0, unread: 0 };
      //     }
      //     acc[entity].total++;
      //     if (notif.isRead) {
      //       acc[entity].read++;
      //     } else {
      //       acc[entity].unread++;
      //     }
      //     return acc;
      //   }, {} as Record<string, { total: number; read: number; unread: number }>);

      const entityGroups = await prisma.notification.groupBy({
        by: ["entity"],
        where: { type: NotificationType.ADMIN },
        _count: true,
      });

      const byEntity = entityGroups.map((group) => {
        const totalByEntity = group._count;

        // calculate read/unread manually from existing notifications[]
        const read = notifications.filter(
          (n) => n.entity === group.entity && n.isRead
        ).length;

        const unread = totalByEntity - read;

        return {
          entity: group.entity,
          total: totalByEntity,
          read,
          unread,
          percentage: total ? (totalByEntity / total) * 100 : 0,
        };
      });

      // Group by type
      const typeGroups = notifications.reduce((acc, notif) => {
        const type = notif.type;
        if (!acc[type]) {
          acc[type] = { total: 0, read: 0, unread: 0 };
        }
        acc[type].total++;
        if (notif.isRead) {
          acc[type].read++;
        } else {
          acc[type].unread++;
        }
        return acc;
      }, {} as Record<string, { total: number; read: number; unread: number }>);

      const byType = Object.entries(typeGroups).map(([type, stats]) => ({
        type,
        ...stats,
      }));

      const result = {
        overview: { total, read, unread },
        byEntity,
        byType,
        trends: {
          last24Hours: trends24h,
          last7Days: trends7d,
          last30Days: trends30d,
        },
      };

      // TODO: Cache the result in Redis (5 minutes TTL)
      // await redis.set(cacheKey, JSON.stringify(result), 'EX', 300);

      return result;
    } catch (error) {
      logger.error(`Error fetching platform analytics: ${error}`);
      throw error;
    }
  }

  public async getEntityBreakdown(entity: string): Promise<{
    entity: string;
    total: number;
    read: number;
    unread: number;
    recentActivity: Array<{
      date: string;
      count: number;
    }>;
    topRecipients: Array<{
      userId: string;
      count: number;
    }>;
  }> {
    try {
      // TODO: Add Redis caching
      // const cacheKey = `platform:analytics:entity:${entity}`;

      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const [notifications, recentNotifications] = await Promise.all([
        prisma.notification.findMany({
          where: {
            type: NotificationType.ADMIN,
            entity: entity as NotificationEntity,
          },
          select: {
            isRead: true,
            recipientId: true,
          },
        }),
        prisma.notification.findMany({
          where: {
            type: NotificationType.ADMIN,
            entity: entity as NotificationEntity,
            createdAt: { gte: thirtyDaysAgo },
          },
          select: {
            createdAt: true,
          },
          orderBy: { createdAt: "asc" },
        }),
      ]);

      const total = notifications.length;
      const read = notifications.filter((n) => n.isRead).length;
      const unread = total - read;

      // Calculate daily activity for the last 30 days
      const activityMap = new Map<string, number>();
      recentNotifications.forEach((notif) => {
        const date = notif.createdAt.toISOString().split("T")[0];
        activityMap.set(date, (activityMap.get(date) || 0) + 1);
      });

      const recentActivity = Array.from(activityMap.entries())
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => a.date.localeCompare(b.date));

      // Top recipients
      const recipientMap = new Map<string, number>();
      notifications.forEach((notif) => {
        if (notif.recipientId) {
          recipientMap.set(
            notif.recipientId,
            (recipientMap.get(notif.recipientId) || 0) + 1
          );
        }
      });

      const topRecipients = Array.from(recipientMap.entries())
        .map(([userId, count]) => ({ userId, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      return {
        entity,
        total,
        read,
        unread,
        recentActivity,
        topRecipients,
      };
    } catch (error) {
      logger.error(`Error fetching entity breakdown for ${entity}: ${error}`);
      throw error;
    }
  }
}

export default NotificationsService;
