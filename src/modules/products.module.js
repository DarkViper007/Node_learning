import { createProductsRepositoryPrisma } from '../repositories/products.repository.prisma.js';
import { createProductsService } from '../services/products.service.js';
import { createProductsController } from '../controllers/products.controller.js';

export function buildProductsModule() {
    const productsRepo = createProductsRepositoryPrisma();
    const productsService = createProductsService(productsRepo);
    const productsController = createProductsController(productsService);

    return { productsController };
}
