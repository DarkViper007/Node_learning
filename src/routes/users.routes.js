import { asyncHandler } from '../middlewares/asyncHandler.js';
import {createUserLimiter} from "../middlewares/rateLimiters.js";

export function addUserRoutes(app, deps) {
    const { usersController, requireApiKeyMw, requireJsonMw } = deps;

    app.get('/users', asyncHandler(usersController.getUsers));
    app.get('/users/:id', asyncHandler(usersController.getUserById));
    app.post('/users',createUserLimiter, requireApiKeyMw, requireJsonMw, asyncHandler(usersController.createUser));
    app.delete('/users/:id', asyncHandler(usersController.deleteUser));
}




