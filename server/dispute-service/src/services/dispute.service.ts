import { prisma } from '@rizlax/db-client'
import { DisputeStatus } from '@prisma/client'
import { DomainError } from '@rizlax/common-middleware'

interface CreateDisputeDTO {
    conversationId: string
    raisedById: string
    title: string
    reason: string
    details: string
}

interface UpdateDisputeDTO {
    title?: string
    reason?: string
    details?: string
    status?: DisputeStatus
    resolvedAt?: Date
    resolvedById?: string
    resolutionNotes?: string
    updatedById?: string
}

export class DisputeService {
    /** Create a new dispute */
    async createDispute(data: CreateDisputeDTO) {
        return await prisma.dispute.create({
            data: {
                ...data,
                status: DisputeStatus.OPEN,
            },
        })
    }

    /** Update an existing dispute */
    async updateDispute(disputeId: string, data: UpdateDisputeDTO) {
        const dispute = await prisma.dispute.findUnique({
            where: { id: disputeId },
        })

        if (!dispute) {
            throw new DomainError('Dispute not found', 'DISPUTE_NOT_FOUND')
        }

        return await prisma.dispute.update({
            where: { id: disputeId },
            data,
        })
    }

    /** Get dispute by ID */
    async getDisputeById(disputeId: string) {
        const dispute = await prisma.dispute.findUnique({
            where: { id: disputeId },
        })

        if (!dispute) {
            throw new DomainError('Dispute not found', 'DISPUTE_NOT_FOUND')
        }

        return dispute
    }

    /** Get all disputes with optional filters */
    async getAllDisputes(filter?: { status?: DisputeStatus; raisedById?: string }) {
        return await prisma.dispute.findMany({
            where: {
                ...filter,
            },
            orderBy: {
                createdAt: 'desc',
            },
        })
    }
}

