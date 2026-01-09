import { z } from 'zod';

export const createOrderSchema = z.object({
    userId: z.coerce.number().int().positive(),
    items: z.array(
        z.object({
            productId: z.coerce.number().int().positive(),
            qty: z.coerce.number().int().positive(),
        })
    ).min(1),
});

export const orderIdParamsSchema = z.object({
    id: z.coerce.number().int().positive(),
});