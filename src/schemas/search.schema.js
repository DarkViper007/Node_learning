import { z } from 'zod';

export const searchSchema = z.object({
    term: z
        .string()
        .trim()
        .min(2, 'term must be at least 2 characters')
        .max(50, 'term must be at most 50 characters'),
});