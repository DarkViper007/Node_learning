import { prisma } from '../db/prisma.js';

export function createOrdersRepositoryPrisma() {
    return {
        async create(tx, data) {
            return tx.order.create({
                data: {
                    userId: data.userId,
                },
            });
        },

        async findById(id) {
            return prisma.order.findUnique({
                where: { id },
                include: {
                    items: {
                        include: {
                            product: true,
                        },
                    },
                },
            });
        },
    };
}
