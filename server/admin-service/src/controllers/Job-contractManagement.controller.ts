import type { Request, Response } from "express";
import JobContractManagementService from "../services/Job-contractManagement.service.ts";
import logger from "@rizlax/logs";

class JobContractManagementController {
  private jobContractManagementService: JobContractManagementService;

  constructor(jobContractManagementService: JobContractManagementService) {
    this.jobContractManagementService = jobContractManagementService;
  }

  public getAllJobs = async (req: Request, res: Response): Promise<void> => {
    try {
      const jobs = await this.jobContractManagementService.getAllJobs();
      res.status(200).json({ success: true, data: jobs });
    } catch (error) {
      logger.error(`Error in getAllJobs controller: ${error}`);
      res.status(500).json({ success: false, message: "Failed to fetch jobs" });
    }
  };

  public getJobById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { jobId } = req.params;
      const job = await this.jobContractManagementService.getJobById(jobId);

      if (!job) {
        res.status(404).json({ success: false, message: "Job not found" });
        return;
      }
      
      res.status(200).json({ success: true, data: job });
    } catch (error) {
      logger.error(`Error in getJobById controller: ${error}`);
      res.status(500).json({ success: false, message: "Failed to fetch job" });
    }
  };

  public getAllContracts = async (req: Request, res: Response): Promise<void> => {
    try {
      const contracts = await this.jobContractManagementService.getAllContracts();
      res.status(200).json({ success: true, data: contracts });
    } catch (error) {
      logger.error(`Error in getAllContracts controller: ${error}`);
      res.status(500).json({ success: false, message: "Failed to fetch contracts" });
    }
  };

  public getContractById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { contractId } = req.params;
      const contract = await this.jobContractManagementService.getContractById(contractId);
      
      if (!contract) {
        res.status(404).json({ success: false, message: "Contract not found" });
        return;
      }
      
      res.status(200).json({ success: true, data: contract });
    } catch (error) {
      logger.error(`Error in getContractById controller: ${error}`);
      res.status(500).json({ success: false, message: "Failed to fetch contract" });
    }
  };

  public getContractsByJobId = async (req: Request, res: Response): Promise<void> => {
    try {
      const { jobId } = req.params;
      const contracts = await this.jobContractManagementService.getContractsByJobId(jobId);
      res.status(200).json({ success: true, data: contracts });
    } catch (error) {
      logger.error(`Error in getContractsByJobId controller: ${error}`);
      res.status(500).json({ success: false, message: "Failed to fetch contracts" });
    }
  };

  public deleteJob = async (req: Request, res: Response): Promise<void> => {
    try {
      const { jobId } = req.params;
      await this.jobContractManagementService.deleteJob(jobId);
      res.status(200).json({ success: true, message: "Job deleted successfully" });
    } catch (error) {
      logger.error(`Error in deleteJob controller: ${error}`);
      res.status(500).json({ success: false, message: "Failed to delete job" });
    }
  };

  public deleteContract = async (req: Request, res: Response): Promise<void> => {
    try {
      const { contractId } = req.params;
      await this.jobContractManagementService.deleteContract(contractId);
      res.status(200).json({ success: true, message: "Contract deleted successfully" });
    } catch (error) {
      logger.error(`Error in deleteContract controller: ${error}`);
      res.status(500).json({ success: false, message: "Failed to delete contract" });
    }
  };

  public suspendJob = async (req: Request, res: Response): Promise<void> => {
    try {
      const { jobId } = req.params;
      const updatedJob = await this.jobContractManagementService.suspendJob(jobId);
      res.status(200).json({ success: true, data: updatedJob, message: "Job suspended successfully" });
    } catch (error) {
      logger.error(`Error in suspendJob controller: ${error}`);
      res.status(500).json({ success: false, message: "Failed to suspend job" });
    }
  };

  public terminateContract = async (req: Request, res: Response): Promise<void> => {
    try {
      const { contractId } = req.params;
      const updatedContract = await this.jobContractManagementService.terminateContract(contractId);
      res.status(200).json({ success: true, data: updatedContract, message: "Contract terminated successfully" });
    } catch (error) {
      logger.error(`Error in terminateContract controller: ${error}`);
      res.status(500).json({ success: false, message: "Failed to terminate contract" });
    }
  };
}

export default JobContractManagementController;