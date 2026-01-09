import { validate } from '../validators/validate.js';
import { ok, created, noContent } from '../utils/httpResponses.js';
import {
    productIdParamsSchema,
    createProductSchema,
    updateProductSchema,
} from '../schemas/products.schema.js';

export function createProductsController(productsService) {
    return {
        getProducts: async (req, res) => {
            const products = await productsService.getProducts();
            ok(res, products);
        },

        getProductById: async (req, res) => {
            const { id } = validate(productIdParamsSchema, req.params);
            const product = await productsService.getProductById(id);
            ok(res, product);
        },

        createProduct: async (req, res) => {
            const dto = validate(createProductSchema, req.body);
            const product = await productsService.createProduct(dto);
            created(res, product);
        },

        updateProduct: async (req, res) => {
            const { id } = validate(productIdParamsSchema, req.params);
            const dto = validate(updateProductSchema, req.body);
            const product = await productsService.updateProduct(id, dto);
            ok(res, product);
        },

        deleteProduct: async (req, res) => {
            const { id } = validate(productIdParamsSchema, req.params);
            await productsService.deleteProduct(id);
            noContent(res);
        },
    };
}
