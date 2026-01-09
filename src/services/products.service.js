import { HttpError } from '../errors/httpError.js';

export function createProductsService(productsRepo) {
    return {
        async getProducts() {
            return productsRepo.findAll();
        },

        async getProductById(id) {
            const product = await productsRepo.findById(id);
            if (!product) throw new HttpError(404, 'product not found');
            return product;
        },

        async createProduct(dto) {
            return productsRepo.create(dto);
        },

        async updateProduct(id, dto) {
            await this.getProductById(id);
            return productsRepo.updateById(id, dto);
        },

        async deleteProduct(id) {
            const ok = await productsRepo.removeById(id);
            if (!ok) throw new HttpError(404, 'product not found');
        },
    };
}
