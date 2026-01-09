import { createOrdersRepositoryPrisma } from '../repositories/orders.repository.prisma.js';
import { createOrderItemsRepositoryPrisma } from '../repositories/orderItems.repository.prisma.js';
import { createProductsRepositoryPrisma } from '../repositories/products.repository.prisma.js';
import { createUsersRepositoryPrisma } from '../repositories/users.repository.prisma.js';

import { createOrdersService } from '../services/orders.service.js';
import { createOrdersController } from '../controllers/orders.controller.js';

export function buildOrdersModule() {
    const ordersRepo = createOrdersRepositoryPrisma();
    const orderItemsRepo = createOrderItemsRepositoryPrisma();
    const productsRepo = createProductsRepositoryPrisma();
    const usersRepo = createUsersRepositoryPrisma();

    const ordersService = createOrdersService({
        ordersRepo,
        orderItemsRepo,
        productsRepo,
        usersRepo,
    });

    const ordersController = createOrdersController(ordersService);

    return { ordersController };
}

