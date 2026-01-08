import { HttpError } from "@monorepo-chatapp/common";
import { logger } from "@/utils/logger";
export const errorHandler = (err, req, res, _next) => {
    logger.error({ err }, "Unhandled error occurred");
    const error = err instanceof HttpError ? err : undefined;
    const statusCode = error?.statusCode ?? 500;
    const message = statusCode >= 500
        ? "Internal server error"
        : (error?.message ?? "Unknown error");
    const payload = error?.details
        ? { message, details: error.details }
        : { message };
    res.status(statusCode).json(payload);
    void _next();
};
//# sourceMappingURL=error-handler.js.map