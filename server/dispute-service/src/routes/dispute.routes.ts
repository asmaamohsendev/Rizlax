// dispute routes with DI
import { Router } from 'express'
import { DisputeController } from '../controllers/dispute.controller'
import { AuthGuard } from '@rizlax/common-middleware'

const router = Router()

interface IDisputeController {
    createDispute: typeof DisputeController.prototype.createDispute
    updateDispute: typeof DisputeController.prototype.updateDispute
    getDisputeById: typeof DisputeController.prototype.getDisputeById
    getAllDisputes: typeof DisputeController.prototype.getAllDisputes
    resolveDispute: typeof DisputeController.prototype.resolveDispute
    closeDispute: typeof DisputeController.prototype.closeDispute
    reopenDispute: typeof DisputeController.prototype.reopenDispute
}

export default function createDisputeRouter(
    disputeController: IDisputeController,
): Router {
    // Base route: /
    router
        .route('/')
        .post(AuthGuard, disputeController.createDispute.bind(disputeController))
        .get(AuthGuard, disputeController.getAllDisputes.bind(disputeController))

    // Dispute by ID: /:disputeId
    router
        .route('/:disputeId')
        .get(AuthGuard, disputeController.getDisputeById.bind(disputeController))
        .put(AuthGuard, disputeController.updateDispute.bind(disputeController))

    // Resolve dispute: /:disputeId/resolve
    router
        .route('/:disputeId/resolve')
        .patch(AuthGuard, disputeController.resolveDispute.bind(disputeController))

    // Close dispute: /:disputeId/close
    router
        .route('/:disputeId/close')
        .patch(AuthGuard, disputeController.closeDispute.bind(disputeController))

    // Reopen dispute: /:disputeId/reopen
    router
        .route('/:disputeId/reopen')
        .patch(AuthGuard, disputeController.reopenDispute.bind(disputeController))

    return router
}