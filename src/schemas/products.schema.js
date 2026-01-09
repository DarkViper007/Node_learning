import { z } from 'zod';

export const productIdParamsSchema = z.object({
    id: z.coerce.number().int().positive(),
});

export const createProductSchema = z.object({
    title: z.string().trim().min(2).max(80),
    price: z.coerce.number().int().positive(),
    stock: z.coerce.number().int().min(0).default(0),
});

export const updateProductSchema = z.object({
    title: z.string().trim().min(2).max(80).optional(),
    price: z.coerce.number().int().positive().optional(),
    stock: z.coerce.number().int().min(0).optional(),
});
