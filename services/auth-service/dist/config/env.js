import "dotenv/config";
import { createEnv, z } from "@monorepo-chatapp/common";
const envSchema = z.object({
    NODE_ENV: z
        .enum(["development", "test", "production"])
        .default("development"),
    AUTH_SERVICE_PORT: z.coerce.number().int().min(0).max(65_535).default(4003),
});
export const env = createEnv(envSchema, {
    serviceName: "auth-service",
});
//# sourceMappingURL=env.js.map