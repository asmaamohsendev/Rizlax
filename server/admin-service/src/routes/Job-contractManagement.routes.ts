import { Router } from "express";
import JobContractManagementController from "../controllers/Job-contractManagement.controller.ts";
import { AuthGuard } from "@rizlax/common-middleware";
import { AdminOnly } from "../middleware/adminOnly.ts";

interface IJobContractManagementController {
    getAllJobs: typeof JobContractManagementController.prototype.getAllJobs;
    getJobById: typeof JobContractManagementController.prototype.getJobById;
    getAllContracts: typeof JobContractManagementController.prototype.getAllContracts;
    getContractById: typeof JobContractManagementController.prototype.getContractById;
    getContractsByJobId: typeof JobContractManagementController.prototype.getContractsByJobId;
    deleteJob: typeof JobContractManagementController.prototype.deleteJob;
    deleteContract: typeof JobContractManagementController.prototype.deleteContract;
    suspendJob: typeof JobContractManagementController.prototype.suspendJob;
    terminateContract: typeof JobContractManagementController.prototype.terminateContract;
}

export default function createJobContractManagementRouter(
  JobContractManagementController: IJobContractManagementController
): Router {
  const router = Router();

  // Job routes
  router
    .route("/jobs")
    .get(
      AuthGuard,
      AdminOnly,
      JobContractManagementController.getAllJobs.bind(JobContractManagementController)
    );

  router
    .route("/jobs/:jobId")
    .get(
      AuthGuard,
      AdminOnly,
      JobContractManagementController.getJobById.bind(JobContractManagementController)
    )
    .delete(
      AuthGuard,
      AdminOnly,
      JobContractManagementController.deleteJob.bind(JobContractManagementController)
    );

  router
    .route("/jobs/:jobId/suspend")
    .patch(
      AuthGuard,
      AdminOnly,
      JobContractManagementController.suspendJob.bind(JobContractManagementController)
    );

  // Contract routes
  router
    .route("/contracts")
    .get(
      AuthGuard,
      AdminOnly,
      JobContractManagementController.getAllContracts.bind(JobContractManagementController)
    );

  router
    .route("/contracts/:contractId")
    .get(
      AuthGuard,
      AdminOnly,
      JobContractManagementController.getContractById.bind(JobContractManagementController)
    )
    .delete(
      AuthGuard,
      AdminOnly,
      JobContractManagementController.deleteContract.bind(JobContractManagementController)
    );

  router
    .route("/jobs/:jobId/contracts")
    .get(
      AuthGuard,
      AdminOnly,
      JobContractManagementController.getContractsByJobId.bind(JobContractManagementController)
    );

  router
    .route("/jobs/:jobId/suspend")
    .patch(
      AuthGuard,
      AdminOnly,
      JobContractManagementController.suspendJob.bind(JobContractManagementController)
    );

  router
    .route("/contracts/:contractId/terminate")
    .patch(
      AuthGuard,
      AdminOnly,
      JobContractManagementController.terminateContract.bind(JobContractManagementController)
    );

  return router;
}

