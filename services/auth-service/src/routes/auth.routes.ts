import { Router } from 'express';
import { validateRequest } from '@monorepo-chatapp/common';
import { registerHandler } from '@/controllers/auth.controller';
import { registerSchema } from '@/routes/auth.schema';

export const authRouter: Router = Router();

authRouter.post('/register', validateRequest({ body: registerSchema.shape.body }), registerHandler);
