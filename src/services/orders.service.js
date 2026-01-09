import { prisma } from '../db/prisma.js';
import { HttpError } from '../errors/httpError.js';

export function createOrdersService({
                                        ordersRepo,
                                        orderItemsRepo,
                                        productsRepo,
                                        usersRepo,
                                    }) {
    return {
        async createOrder(dto) {
            return prisma.$transaction(async (tx) => {
                const user = await usersRepo.findById(dto.userId);
                if (!user) {
                    throw new HttpError(404, 'user not found');
                }

                const productIds = dto.items.map(i => i.productId);
                const products = await tx.product.findMany({
                    where: { id: { in: productIds } },
                });

                const map = new Map(products.map(p => [p.id, p]));

                for (const item of dto.items) {
                    const product = map.get(item.productId);
                    if (!product) {
                        throw new HttpError(404, `product not found: ${item.productId}`);
                    }
                    if (product.stock < item.qty) {
                        throw new HttpError(409, `not enough stock for product: ${product.id}`);
                    }
                }

                const order = await ordersRepo.create(tx, {
                    userId: dto.userId,
                });

                for (const item of dto.items) {
                    const product = map.get(item.productId);

                    await orderItemsRepo.create(tx, {
                        orderId: order.id,
                        productId: product.id,
                        qty: item.qty,
                        price: product.price,
                    });

                    await productsRepo.decrementStock(tx, product.id, item.qty);
                }

                return ordersRepo.findById(tx, order.id);
            });
        },
        async getOrderById(id) {
            const order = await ordersRepo.findById(id);
            if (!order) throw new HttpError(404, 'order not found');
            return order;
        },
    };
}

