import dotenv from "dotenv";
import App from "./core/app.ts";
import { connectDB } from "@rizlax/db-client";
import logger from "@rizlax/logs";
import { DisputeService } from "./services/dispute.service.ts";
import { DisputeController } from "./controllers/dispute.controller.ts";
import createDisputeRouter from "./routes/dispute.routes.ts";

dotenv.config();

const PORT = parseInt(process.env.DISPUTE_PORT || "3001", 10);

const startServer = async () => {
  try {
    logger.info("starting dispute service...");
    const disputeService = new DisputeService();
    const disputeController = new DisputeController(disputeService);
    const disputeRouter = createDisputeRouter(disputeController);

    const routers = [{ path: "/api/v1/disputes", router: disputeRouter }];

    logger.info("connecting to database...");
    await connectDB();
    logger.info("database connected successfully.");

    const server = new App(PORT, routers);

    await server.listen();
  } catch (error) {
    logger.error("Error starting server:", error);
  }
};

startServer();
