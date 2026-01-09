import { prisma } from '../db/prisma.js';

export function createProductsRepositoryPrisma() {
    return {
        async findAll() {
            return prisma.product.findMany({ orderBy: { id: 'asc' } });
        },

        async findById(id) {
            return prisma.product.findUnique({ where: { id } });
        },

        async create(data) {
            return prisma.product.create({
                data: {
                    title: data.title.trim(),
                    price: data.price,
                    stock: data.stock ?? 0,
                },
            });
        },

        async updateById(id, data) {
            return prisma.product.update({
                where: { id },
                data: {
                    title: data.title?.trim(),
                    price: data.price,
                    stock: data.stock,
                },
            });
        },

        async removeById(id) {
            try {
                await prisma.product.delete({ where: { id } });
                return true;
            } catch {
                return false;
            }
        },
        async decrementStock(tx, productId, qty) {
            return tx.product.update({
                where: { id: productId },
                data: {
                    stock: { decrement: qty },
                },
            });
        }
    };
}
