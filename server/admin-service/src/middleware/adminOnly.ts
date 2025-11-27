import type { NextFunction, Request, Response } from "express";

interface AuthRequest extends Request {
  user?: {
    id: string;
    role: "ADMIN";
  };
}

export const AdminOnly = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.role === "ADMIN") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admins only." });
  }
};
