import type { Request, Response, NextFunction } from "express";
import AuthService from "../services/Auth.ts";
import logger from "@rizlax/logs";

interface IAuthService {
  register: typeof AuthService.prototype.register;
  login: typeof AuthService.prototype.login;
  refresh: typeof AuthService.prototype.refresh;
  logout: typeof AuthService.prototype.logout;
}

class AuthController {
  private authService: IAuthService;

  constructor(authService: IAuthService) {
    this.authService = authService;
  }

  // POST /api/auth/register
  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, phoneNumber, country, password, role } = req.body;

      const result = await this.authService.register({
        name,
        email,
        country,
        password,
        role,
      });

      res.cookie("refresh_token", result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(201).json({
        message: "Registration successful",
        user: result.user,
        accessToken: result.accessToken,
      });
    } catch (error: any) {
      if (error.message.includes("User already exists")) {
        return res.status(409).json({ message: error.message });
      }

      logger.error("Error during registration", {
        error: error.message,
        email: req.body.email,
      });
      next(error);
    }
  }

  // POST /api/auth/login
  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, role } = req.body;

      const result = await this.authService.login({ email, password, role });

      res.cookie("refresh_token", result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.cookie("access_token", result.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 60 * 1000, 
      });

      return res.status(200).json({
        message: "Login successful",
        user: result.user,
        accessToken: result.accessToken,
      });
    } catch (error: any) {
      if (
        error.message.includes("credentials") ||
        error.message.includes("Google account")
      ) {
        return res.status(401).json({ message: error.message });
      }
      logger.error("Error during login", {
        error: error.message,
        email: req.body.email,
      });
      next(error);
    }
  }

  public async refresh(req: Request, res: Response): Promise<Response> {
    try {
      // Try to get refresh token from cookies first
      const refreshToken = req.cookies?.refreshToken;

      if (!refreshToken) {
        logger.warn("Refresh token missing from cookies");
        return res.status(401).json({
          message: "Refresh token not found. Please log in again.",
        });
      }

      const result = await this.authService.refresh(refreshToken);

      logger.info("Access token refreshed successfully");
      return res.status(200).json(result);
    } catch (error: any) {
      logger.error("Token refresh failed:", error);
      return res.status(401).json({
        message: error.message || "Failed to refresh access token.",
      });
    }
  }

  public async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(400).json({ message: "No token provided" });
      }

      const result = await this.authService.logout(token);

      res.clearCookie("refresh_token");

      return res.status(200).json(result);
    } catch (error: any) {
      res.clearCookie("refresh_token");
      return res
        .status(200)
        .json({ message: "Successfully logged out (session cleared)" });
    }
  }
}

export default AuthController;
