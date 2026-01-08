import 'dotenv/config';
import { createEnv, z } from '@monorepo-chatapp/common';
const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    USER_SERVICE_PORT: z.coerce.number().int().min(0).max(65_535).default(4001),
    USER_DB_URL: z.url(),
    RABBITMQ_URL: z.url().optional(),
    INTERNAL_API_TOKEN: z.string().min(16),
});
export const env = createEnv(envSchema, {
    serviceName: 'user-service',
});
//# sourceMappingURL=env.js.map