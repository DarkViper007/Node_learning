import { asyncHandler } from '../middlewares/asyncHandler.js';

export function addOrderRoutes(app, deps) {
    const { ordersController, requireJsonMw } = deps;
    app.post('/orders', requireJsonMw, asyncHandler(ordersController.createOrder));

    app.get('/orders/:id', asyncHandler(ordersController.getOrderById));
}
