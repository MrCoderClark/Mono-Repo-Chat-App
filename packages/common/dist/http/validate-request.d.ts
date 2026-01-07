import { z } from 'zod';
import type { NextFunction, Request, Response } from 'express';
type Schema = z.ZodType;
export interface RequestValidationOptions {
    body?: Schema;
    params?: Schema;
    query?: Schema;
}
export declare const validateRequest: (schemas: RequestValidationOptions) => (req: Request, _res: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=validate-request.d.ts.map