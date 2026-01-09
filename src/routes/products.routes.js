import { asyncHandler } from '../middlewares/asyncHandler.js';

export function addProductRoutes(app, deps) {
    const { productsController, requireJsonMw } = deps;

    app.get('/products', asyncHandler(productsController.getProducts));
    app.get('/products/:id', asyncHandler(productsController.getProductById));
    app.post('/products', requireJsonMw, asyncHandler(productsController.createProduct));
    app.patch('/products/:id', requireJsonMw, asyncHandler(productsController.updateProduct));
    app.delete('/products/:id', asyncHandler(productsController.deleteProduct));
}
