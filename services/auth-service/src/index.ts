import { createApp } from '@/app';
import { createServer } from 'http';
import { env } from '@/config/env';
import { logger } from '@/utils/logger';
import { closeDatabase, connectToDatabase } from '@/db/sequelize';
import { initModels } from '@/models';

const main = async () => {
    try {
        await connectToDatabase();
        await initModels();

        const app = createApp();
        const server = createServer(app);

        const port = env.AUTH_SERVICE_PORT;

        server.listen(port, () => logger.info(`Auth service is running on port ${port}`));

        const shutdown = async () => {
            logger.info('Shutting down auth service');
            await closeDatabase();
            server.close(() => process.exit(0));
        };

        // Unix signals (Linux/macOS)
        process.on('SIGINT', shutdown);
        process.on('SIGTERM', shutdown);

        // Log on any exit (sync only)
        // process.on('exit', (code) => {
        //     console.log(`Auth service exited with code ${code}`);
        // });
    } catch (error) {
        logger.error(`Failed to start auth service. Error: ${JSON.stringify(error)}`);
        process.exit(1);
    }
};

void main();
