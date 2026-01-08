import 'dotenv/config';
import { z } from '@monorepo-chatapp/common';
declare const envSchema: z.ZodObject<{
    NODE_ENV: z.ZodDefault<z.ZodEnum<{
        development: "development";
        test: "test";
        production: "production";
    }>>;
    USER_SERVICE_PORT: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    USER_DB_URL: z.ZodURL;
    RABBITMQ_URL: z.ZodOptional<z.ZodURL>;
    INTERNAL_API_TOKEN: z.ZodString;
}, z.core.$strip>;
type EnvType = z.infer<typeof envSchema>;
export declare const env: EnvType;
export type Env = typeof env;
export {};
//# sourceMappingURL=env.d.ts.map