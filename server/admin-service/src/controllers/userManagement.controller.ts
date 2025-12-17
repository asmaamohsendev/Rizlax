import type { Request, Response, NextFunction } from "express";
import UserManagementService from "../services/userManagement.service.ts";
import logger from "@rizlax/logs";

interface AuthRequest extends Request {
  user?: {
    id: string;
    role: "ADMIN" | "MODERATOR";
  };
}

class UserManagementController {
  private userManagementService: UserManagementService;

  constructor(userManagementService: UserManagementService) {
    this.userManagementService = userManagementService;
  }

  // GET /api/admin/users/:id (Private)
  public async getUserById(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const userId = req.params.id;

      if (!userId || typeof userId !== 'string' || userId.trim() === '') {
        return res.status(400).json({ error: 'Invalid user ID provided' });
      }

      const user = await this.userManagementService.getUserById(userId);
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json(user);
    } catch (error: any) {
      logger.error("Error fetching user by ID", { error: error.message });
      next(error);
    }
  }

  // GET /api/admin/users (Private)
  public async getAllUsers(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const users = await this.userManagementService.getAllUsers();
      return res.status(200).json(users);
    } catch (error: any) {
      logger.error("Error fetching all users", { error: error.message });
      next(error);
    }
  }

  // PATCH /api/admin/users/:id/suspend (Private)
  public async suspendUser(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const userId = req.params.id;
      const { days = 3 } = req.body;
      
      if (!userId || typeof userId !== 'string' || userId.trim() === '') {
        return res.status(400).json({ error: 'Invalid user ID provided' });
      }

      if (userId === req.user.id) {
        return res.status(400).json({ error: 'Cannot suspend yourself' });
      }

      const updatedUser = await this.userManagementService.suspendUser(userId, days);
      return res.status(200).json(updatedUser);
    } catch (error: any) {
      logger.error("Error suspending user", { error: error.message });
      next(error);
    }
  }

  // PATCH /api/admin/users/:id/ban (Private)
  public async banUser(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const userId = req.params.id;
      
      if (!userId || typeof userId !== 'string' || userId.trim() === '') {
        return res.status(400).json({ error: 'Invalid user ID provided' });
      }

      if (userId === req.user.id) {
        return res.status(400).json({ error: 'Cannot ban yourself' });
      }

      const updatedUser = await this.userManagementService.banUser(userId);
      return res.status(200).json(updatedUser);
    } catch (error: any) {
      logger.error("Error banning user", { error: error.message });
      next(error);
    }
  }

  // PATCH /api/admin/users/:id/verify (Private)
  public async verifyUser(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const userId = req.params.id;
      
      if (!userId || typeof userId !== 'string' || userId.trim() === '') {
        return res.status(400).json({ error: 'Invalid user ID provided' });
      }

      const updatedUser = await this.userManagementService.verifyUser(userId);
      return res.status(200).json(updatedUser);
    } catch (error: any) {
      logger.error("Error verifying user", { error: error.message });
      next(error);
    }
  }
}

export default UserManagementController;
