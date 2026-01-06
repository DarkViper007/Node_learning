import { z } from 'zod';

export const createUserSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, 'name must be at least 2 characters')
        .max(50, 'name must be at most 50 characters'),
});

export const userIdParamsSchema = z.object({
    id: z.coerce.number().int().positive(),
});
