import { createApp } from '@/app';
import { createServer } from 'http';
import { env } from '@/config/env';
import { logger } from '@/utils/logger';

const main = async () => {
    try {
        const app = createApp();
        const server = createServer(app);

        const port = env.GATEWAY_PORT;

        server.listen(port, () => logger.info(`Gateway service is running on port ${port}`));

        const shutdown = async () => {
            logger.info('Shutting down gateway service');

            server.close(() => process.exit(0));
        };

        // Unix signals (Linux/macOS)
        process.on('SIGINT', shutdown);
        process.on('SIGTERM', shutdown);
    } catch (error) {
        logger.error(`Failed to start gateway service. Error: ${JSON.stringify(error)}`);
        process.exit(1);
    }
};

void main();
