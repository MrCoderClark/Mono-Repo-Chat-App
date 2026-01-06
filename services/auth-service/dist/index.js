import { createApp } from "@/app";
import { createServer } from "http";
import { env } from "@/config/env";
import { logger } from "@/utils/logger";
const main = async () => {
    try {
        const app = createApp();
        const server = createServer(app);
        const port = env.AUTH_SERVICE_PORT;
        server.listen(port, () => logger.info(`Auth service is running on ${port}`));
    }
    catch (error) {
        logger.error(`Failed to start auth service. Error: ${JSON.stringify(error)}`);
        process.exit(1);
    }
};
void main();
//# sourceMappingURL=index.js.map