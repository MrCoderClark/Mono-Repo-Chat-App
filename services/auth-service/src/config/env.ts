import 'dotenv/config';

import { createEnv, z } from '@monorepo-chatapp/common';

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    AUTH_SERVICE_PORT: z.coerce.number().int().min(0).max(65_535).default(4003),
    INTERNAL_AUTH_TOKEN: z.string().min(32),
    AUTH_DB_URL: z.url(),
    JWT_SCRET_KEY: z.string().min(32),
    JWT_EXPIRES_IN: z.string().default('1d'),
    JWT_REFRESH_SECRET: z.string().min(32),
    JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
    RABBITMQ_URL: z.url(),
});

type EnvType = z.infer<typeof envSchema>;

export const env: EnvType = createEnv(envSchema, {
    serviceName: 'auth-service',
});

export type Env = typeof env;
