import { z } from "zod";
export const createEnv = (schema, options = {}) => {
    const { source = process.env, serviceName = "service" } = options;
    const parsed = schema.safeParse(source);
    if (!parsed.success) {
        const formattedErrors = z.treeifyError(parsed.error);
        throw new Error(`[${serviceName}] Environment variables validation failed:\n` +
            JSON.stringify(formattedErrors, null, 2));
    }
    return parsed.data;
};
//# sourceMappingURL=env.js.map