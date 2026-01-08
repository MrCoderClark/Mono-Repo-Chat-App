import { createApp } from '@/app';
import { createServer } from 'http';
import { env } from '@/config/env';
import { logger } from '@/utils/logger';
import { closeDatabase, connectToDatabase } from '@/db/sequelize';
import { initModels } from '@/models';
import { closePublisher, initPublisher } from '@/messaging/event-publishing';

const main = async () => {
    try {
        await connectToDatabase();
        await initModels();
        await initPublisher();

        const app = createApp();
        const server = createServer(app);

        const port = env.AUTH_SERVICE_PORT;

        server.listen(port, () => logger.info(`Auth service is running on port ${port}`));

        // const shutdown = async () => {
        //     logger.info('Shutting down auth service');
        //     await closeDatabase();
        //     server.close(() => process.exit(0));
        // };

        const shutdown = () => {
            logger.info('Shutting down auth service...');

            Promise.all([closeDatabase(), closePublisher()])
                .catch((error: unknown) => {
                    logger.error({ error }, 'Error during shutdown tasks');
                })
                .finally(() => {
                    server.close(() => process.exit(0));
                });
        };

        // Unix signals (Linux/macOS)
        process.on('SIGINT', shutdown);
        process.on('SIGTERM', shutdown);
    } catch (error) {
        logger.error(`Failed to start auth service. Error: ${JSON.stringify(error)}`);
        process.exit(1);
    }
};

void main();
