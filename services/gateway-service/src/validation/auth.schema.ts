import { z } from '@monorepo-chatapp/common';

export const registerSchema = z.object({
    email: z.email(),
    password: z.string().min(8),
    displayName: z.string().min(3).max(30),
});

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(8),
});

export const refreshSchema = z.object({
    refreshToken: z.string(),
});

export const revokeSchema = z.object({
    userId: z.uuid(),
});
