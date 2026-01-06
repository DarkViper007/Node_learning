import { asyncHandler } from '../middlewares/asyncHandler.js';
import { requireApiKey } from '../middlewares/requireApiKey.js';
import { requireJson } from '../middlewares/requireJson.js';
import { getUsers, getUserById, createUser, deleteUser } from '../controllers/users.controller.js';

export function addUserRoutes(app) {
    app.get('/users', asyncHandler(getUsers));
    app.get('/users/:id', asyncHandler(getUserById));
    app.post('/users', requireApiKey, requireJson, asyncHandler(createUser));
    app.delete('/users/:id', asyncHandler(deleteUser));
}



