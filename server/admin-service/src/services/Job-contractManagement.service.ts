import { prisma } from "@rizlax/db-client";
import type { Job, Contract } from "@prisma/client";
import { JobStatus, ContractStatus } from "@prisma/client";
import logger from "@rizlax/logs";

class JobContractManagementService {
  public async getAllJobs(): Promise<Job[]> {
    try {
      const jobs = await prisma.job.findMany();
      return jobs;
    } catch (error) {
      logger.error(`Error fetching all jobs: ${error}`);
      throw error;
    }
  }

  public async getJobById(jobId: string): Promise<Job | null> {
    try {
      const job = await prisma.job.findUnique({
        where: { id: jobId },
      });
      return job;
    } catch (error) {
      logger.error(`Error fetching job by ID: ${error}`);
      throw error;
    }
  }

  public async getAllContracts(): Promise<Contract[]> {
    try {
      const contracts = await prisma.contract.findMany();
      return contracts;
    } catch (error) {
      logger.error(`Error fetching all contracts: ${error}`);
      throw error;
    }
  }

  public async getContractById(contractId: string): Promise<Contract | null> {
    try {
      const contract = await prisma.contract.findUnique({
        where: { id: contractId },
      });
      return contract;
    } catch (error) {
      logger.error(`Error fetching contract by ID: ${error}`);
      throw error;
    }
  }

  public async getContractsByJobId(jobId: string): Promise<Contract[]> {
    try {
      const contracts = await prisma.contract.findMany({
        where: { jobId },
      });
      return contracts;
    } catch (error) {
      logger.error(`Error fetching contracts by job ID: ${error}`);
      throw error;
    }
  }

  public async deleteJob(jobId: string): Promise<void> {
    try {
      await prisma.job.delete({
        where: { id: jobId },
      });
    } catch (error) {
      logger.error(`Error deleting job by ID: ${error}`);
      throw error;
    }
  }

  public async deleteContract(contractId: string): Promise<void> {
    try {
      await prisma.contract.delete({
        where: { id: contractId },
      });
    } catch (error) {
      logger.error(`Error deleting contract by ID: ${error}`);
      throw error;
    }
  }

  public async suspendJob(jobId: string): Promise<Job> {
    try {
      const updatedJob = await prisma.job.update({
        where: { id: jobId },
        data: { status: JobStatus.SUSPENDED },
      });
      return updatedJob;
    } catch (error) {
      logger.error(`Error suspending job: ${error}`);
      throw error;
    }
  }

  public async terminateContract(contractId: string): Promise<Contract> {
    try {
      const updatedContract = await prisma.contract.update({
        where: { id: contractId },
        data: { status: ContractStatus.TERMINATED },
      });
      return updatedContract;
    } catch (error) {
      logger.error(`Error terminating contract: ${error}`);
      throw error;
    }
  }
}

export default JobContractManagementService;
