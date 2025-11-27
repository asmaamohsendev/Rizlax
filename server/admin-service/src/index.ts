import dotenv from 'dotenv';
import App from './core/App.ts';
import { connectDB } from '@rizlax/db-client';
import logger from '@rizlax/logs';

import UserManagementService from './services/userManagement.service.ts';
import UserManagementController from './controllers/userManagement.controller.ts';
import createUserManagementRouter from './routes/userManagement.routes.ts';

dotenv.config({ path: '../../.env' });

const PORT = parseInt(process.env.ADMIN_PORT || '3002', 10);

const userManagementService = new UserManagementService();
const userManagementController = new UserManagementController(userManagementService);
const userManagementRouter = createUserManagementRouter(userManagementController);

const app = new App(PORT, [
    { path: '/api/v1/users', router: userManagementRouter }
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