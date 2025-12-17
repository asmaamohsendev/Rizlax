import { Router } from "express";
import UserManagementController from "../controllers/userManagement.controller.ts";
import { AuthGuard } from "@rizlax/common-middleware";
import { AdminOnly } from "../middleware/adminOnly.ts";

interface IUserManagementController {
  getAllUsers: typeof UserManagementController.prototype.getAllUsers;
  getUserById: typeof UserManagementController.prototype.getUserById;
  suspendUser: typeof UserManagementController.prototype.suspendUser;
  banUser: typeof UserManagementController.prototype.banUser;
  verifyUser: typeof UserManagementController.prototype.verifyUser;
}

export default function createUserManagementRouter(
  UserManagementController: IUserManagementController
): Router {
  const router = Router();
  
  // GET /api/admin/users (Private)
  router.get(
    "/users",
    AuthGuard,
    AdminOnly,
    UserManagementController.getAllUsers.bind(UserManagementController)
  );

  router.get(
    "/users/:id",
    AuthGuard,
    AdminOnly,
    UserManagementController.getUserById.bind(UserManagementController)
  );

  // PATCH /api/admin/users/:id/suspend (Private)
  router.patch(
    "/users/:id/suspend",
    AuthGuard,
    AdminOnly,
    UserManagementController.suspendUser.bind(UserManagementController)
  );

  // PATCH /api/admin/users/:id/ban (Private)
  router.patch(
    "/users/:id/ban",
    AuthGuard,
    AdminOnly,
    UserManagementController.banUser.bind(UserManagementController)
  );

  // PATCH /api/admin/users/:id/verify (Private)
  router.patch(
    "/users/:id/verify",
    AuthGuard,
    AdminOnly,
    UserManagementController.verifyUser.bind(UserManagementController)
  );

  return router;
}
