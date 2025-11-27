import { prisma } from "@rizlax/db-client";
import type { User } from "@prisma/client";
import { UserStatus } from "@prisma/client";
import logger from "@rizlax/logs";

interface GetAllUsersParams {
  page?: number;
  limit?: number;
  status?: UserStatus;
  isVerified?: boolean;
  search?: string;
  sortBy?: "createdAt" | "updatedAt" | "email" | "username";
  sortOrder?: "asc" | "desc";
}

interface PaginatedUsersResponse {
  users: User[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

class UserManagementService {
  public async getUserById(userId: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      return user;
    } catch (error) {
      logger.error(`Error fetching user by ID: ${error}`);
      throw error;
    }
  }

  public async getAllUsers(
    params: GetAllUsersParams = {}
  ): Promise<PaginatedUsersResponse> {
    try {
      const {
        page = 1,
        limit = 10,
        status,
        isVerified,
        search,
        sortBy = "createdAt",
        sortOrder = "desc",
      } = params;

      const skip = (page - 1) * limit;

      // Build where clause for filtering
      const where: any = {};

      if (status) {
        where.status = status;
      }

      if (isVerified !== undefined) {
        where.isVerified = isVerified;
      }

      if (search) {
        where.OR = [
          { email: { contains: search, mode: "insensitive" } },
          { username: { contains: search, mode: "insensitive" } },
        ];
      }

      // Get total count for pagination
      const total = await prisma.user.count({ where });

      // Fetch users with pagination and filters
      const users = await prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          [sortBy]: sortOrder,
        },
      });

      const totalPages = Math.ceil(total / limit);

      return {
        users,
        pagination: {
          total,
          page,
          limit,
          totalPages,
        },
      };
    } catch (error) {
      logger.error(`Error fetching all users: ${error}`);
      throw error;
    }
  }

  public async suspendUser(userId: string, days = 3): Promise<User> {
    try {
      const suspendedUntil = new Date();
      suspendedUntil.setDate(suspendedUntil.getDate() + days); // 3 days suspension

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { status: UserStatus.SUSPENDED, suspendedUntil },
      });
      return updatedUser;
    } catch (error) {
      logger.error(`Error suspending user: ${error}`);
      throw error;
    }
  }

  public async banUser(userId: string): Promise<User> {
    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { status: UserStatus.BANNED },
      });
      return updatedUser;
    } catch (error) {
      logger.error(`Error banning user: ${error}`);
      throw error;
    }
  }

  public async verifyUser(userId: string): Promise<User> {
    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { isVerified: true },
      });
      return updatedUser;
    } catch (error) {
      logger.error(`Error verifying user: ${error}`);
      throw error;
    }
  }

  public async checkAndReactivateSuspension(
    userId: string
  ): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (user?.status === UserStatus.SUSPENDED && user.suspendedUntil) {
        if (new Date() > user.suspendedUntil) {
          return await prisma.user.update({
            where: { id: userId },
            data: {
              status: UserStatus.ACTIVE,
              suspendedUntil: null,
            },
          });
        }
      }

      return user;
    } catch (error) {
      logger.error(`Error checking suspension: ${error}`);
      throw error;
    }
  }
}

export default UserManagementService;
