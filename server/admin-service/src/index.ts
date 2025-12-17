import dotenv from 'dotenv';
import App from './core/App.ts';
import { connectDB } from '@rizlax/db-client';
import logger from '@rizlax/logs';

import UserManagementService from './services/userManagement.service.ts';
import UserManagementController from './controllers/userManagement.controller.ts';
import createUserManagementRouter from './routes/userManagement.routes.ts';

import JobContractManagementService from './services/Job-contractManagement.service.ts';
import JobContractManagementController from './controllers/Job-contractManagement.controller.ts';
import createJobContractManagementRouter from './routes/Job-contractManagement.routes.ts';

dotenv.config({ path: '../../.env' });

const PORT = parseInt(process.env.ADMIN_PORT || '3002', 10);

const userManagementService = new UserManagementService();
const userManagementController = new UserManagementController(userManagementService);
const userManagementRouter = createUserManagementRouter(userManagementController);

const jobContractManagementService = new JobContractManagementService();
const jobContractManagementController = new JobContractManagementController(jobContractManagementService);
const jobContractManagementRouter = createJobContractManagementRouter(jobContractManagementController);

const app = new App(PORT, [
    { path: '/api/v1/admin', router: userManagementRouter },
    { path: '/api/v1/admin', router: jobContractManagementRouter }
]);

async function startServer() {
    try {
        console.log('Starting Admin Service dependency setup...');

        console.log('Connecting to database...');
        await connectDB();
        console.log('Database connected successfully.');

        await app.listen();
    } catch (error) {
        logger.error('Admin Service failed to start:', { error });
        console.error('Admin Service failed to start:', error);
        process.exit(1);
    }
}

startServer();