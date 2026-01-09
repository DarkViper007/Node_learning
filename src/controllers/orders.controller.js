import { validate } from '../validators/validate.js';
import { created } from '../utils/httpResponses.js';
import { ok } from '../utils/httpResponses.js';
import {createOrderSchema, orderIdParamsSchema} from '../schemas/orders.schema.js';

export function createOrdersController(ordersService) {
    return {
        createOrder: async (req, res) => {
            const dto = validate(createOrderSchema, req.body);
            const order = await ordersService.createOrder(dto);
            created(res, order);
        },
        getOrderById: async (req, res) => {
            const { id } = validate(orderIdParamsSchema, req.params);
            const order = await ordersService.getOrderById(id);
            ok(res, order);
        },
    };
}
