import 'dotenv/config';

import { createEnv, z } from '@monorepo-chatapp/common';

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    GATEWAY_PORT: z.coerce.number().int().min(0).max(65_535).default(4000),
    AUTH_SERVICE_URL: z.url(),
});

type EnvType = z.infer<typeof envSchema>;

export const env: EnvType = createEnv(envSchema, {
    serviceName: 'gateway-service',
});

export type Env = typeof env;
