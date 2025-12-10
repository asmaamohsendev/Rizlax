import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { DisputeStatus } from '@prisma/client'
import { DomainError } from '@rizlax/common-middleware'
import { DisputeService } from '../services/dispute.service'

// Zod Schemas
const createDisputeSchema = z.object({
    conversationId: z.string().uuid('Invalid conversation ID'),
    raisedById: z.string().uuid('Invalid user ID'),
    title: z.string().min(3, 'Title must be at least 3 characters').max(200, 'Title too long'),
    reason: z.string().min(10, 'Reason must be at least 10 characters').max(500, 'Reason too long'),
    details: z.string().min(20, 'Details must be at least 20 characters').max(2000, 'Details too long'),
})

const updateDisputeSchema = z.object({
    title: z.string().min(3).max(200).optional(),
    reason: z.string().min(10).max(500).optional(),
    details: z.string().min(20).max(2000).optional(),
    status: z.nativeEnum(DisputeStatus).optional(),
    resolvedAt: z.string().datetime().optional().transform(val => val ? new Date(val) : undefined),
    resolvedById: z.string().uuid().optional(),
    resolutionNotes: z.string().min(10).max(1000).optional(),
    updatedById: z.string().uuid().optional(),
})

const disputeIdSchema = z.object({
    disputeId: z.string().uuid('Invalid dispute ID'),
})

const getDisputesQuerySchema = z.object({
    status: z.nativeEnum(DisputeStatus).optional(),
    raisedById: z.string().uuid().optional(),
})

export class DisputeController {
    private disputeService: DisputeService

    constructor(disputeService: DisputeService) {
        this.disputeService = disputeService
    }

    /** Create a new dispute */
    createDispute = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const validatedData = createDisputeSchema.parse(req.body)
            const dispute = await this.disputeService.createDispute(validatedData)

            res.status(201).json({
                success: true,
                data: dispute,
                message: 'Dispute created successfully',
            })
        } catch (error) {
            if (error instanceof z.ZodError) {
                return next(new DomainError(
                    error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
                    'VALIDATION_ERROR',
                    400
                ))
            }
            next(error)
        }
    }

    /** Update an existing dispute */
    updateDispute = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { disputeId } = disputeIdSchema.parse(req.params)
            const validatedData = updateDisputeSchema.parse(req.body)

            // Additional business logic validation
            if (validatedData.status === DisputeStatus.RESOLVED && !validatedData.resolutionNotes) {
                throw new DomainError(
                    'Resolution notes are required when resolving a dispute',
                    'MISSING_RESOLUTION_NOTES',
                    400
                )
            }

            if (validatedData.status === DisputeStatus.RESOLVED && !validatedData.resolvedById) {
                throw new DomainError(
                    'Resolver ID is required when resolving a dispute',
                    'MISSING_RESOLVER_ID',
                    400
                )
            }

            // Auto-set resolvedAt if status is RESOLVED
            if (validatedData.status === DisputeStatus.RESOLVED && !validatedData.resolvedAt) {
                validatedData.resolvedAt = new Date()
            }

            const dispute = await this.disputeService.updateDispute(disputeId, validatedData)

            res.status(200).json({
                success: true,
                data: dispute,
                message: 'Dispute updated successfully',
            })
        } catch (error) {
            if (error instanceof z.ZodError) {
                return next(new DomainError(
                    error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
                    'VALIDATION_ERROR',
                    400
                ))
            }
            next(error)
        }
    }

    /** Get dispute by ID */
    getDisputeById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { disputeId } = disputeIdSchema.parse(req.params)
            const dispute = await this.disputeService.getDisputeById(disputeId)

            res.status(200).json({
                success: true,
                data: dispute,
            })
        } catch (error) {
            if (error instanceof z.ZodError) {
                return next(new DomainError(
                    error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
                    'VALIDATION_ERROR',
                    400
                ))
            }
            next(error)
        }
    }

    /** Get all disputes with optional filters */
    getAllDisputes = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const validatedQuery = getDisputesQuerySchema.parse(req.query)
            const disputes = await this.disputeService.getAllDisputes(validatedQuery)

            res.status(200).json({
                success: true,
                data: disputes,
                count: disputes.length,
            })
        } catch (error) {
            if (error instanceof z.ZodError) {
                return next(new DomainError(
                    error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
                    'VALIDATION_ERROR',
                    400
                ))
            }
            next(error)
        }
    }

    /** Resolve a dispute (convenience method) */
    resolveDispute = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { disputeId } = disputeIdSchema.parse(req.params)
            const resolveSchema = z.object({
                resolvedById: z.string().uuid('Invalid resolver ID'),
                resolutionNotes: z.string().min(10, 'Resolution notes must be at least 10 characters').max(1000),
            })

            const { resolvedById, resolutionNotes } = resolveSchema.parse(req.body)

            const dispute = await this.disputeService.updateDispute(disputeId, {
                status: DisputeStatus.RESOLVED,
                resolvedById,
                resolutionNotes,
                resolvedAt: new Date(),
            })

            res.status(200).json({
                success: true,
                data: dispute,
                message: 'Dispute resolved successfully',
            })
        } catch (error) {
            if (error instanceof z.ZodError) {
                return next(new DomainError(
                    error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
                    'VALIDATION_ERROR',
                    400
                ))
            }
            next(error)
        }
    }

    /** Close a dispute without resolution */
    closeDispute = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { disputeId } = disputeIdSchema.parse(req.params)
            const closeSchema = z.object({
                updatedById: z.string().uuid('Invalid user ID'),
                resolutionNotes: z.string().min(10).max(1000).optional(),
            })

            const { updatedById, resolutionNotes } = closeSchema.parse(req.body)

            const dispute = await this.disputeService.updateDispute(disputeId, {
                status: DisputeStatus.CLOSED,
                updatedById,
                resolutionNotes,
            })

            res.status(200).json({
                success: true,
                data: dispute,
                message: 'Dispute closed successfully',
            })
        } catch (error) {
            if (error instanceof z.ZodError) {
                return next(new DomainError(
                    error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
                    'VALIDATION_ERROR',
                    400
                ))
            }
            next(error)
        }
    }

    /** Reopen a dispute */
    reopenDispute = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { disputeId } = disputeIdSchema.parse(req.params)
            const reopenSchema = z.object({
                updatedById: z.string().uuid('Invalid user ID'),
                reason: z.string().min(10, 'Reason must be at least 10 characters').max(500),
            })

            const { updatedById, reason } = reopenSchema.parse(req.body)

            const dispute = await this.disputeService.updateDispute(disputeId, {
                status: DisputeStatus.OPEN,
                updatedById,
                details: `Reopened: ${reason}`,
                resolvedAt: undefined,
                resolvedById: undefined,
            })

            res.status(200).json({
                success: true,
                data: dispute,
                message: 'Dispute reopened successfully',
            })
        } catch (error) {
            if (error instanceof z.ZodError) {
                return next(new DomainError(
                    error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
                    'VALIDATION_ERROR',
                    400
                ))
            }
            next(error)
        }
    }
}