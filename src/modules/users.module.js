import { createUsersRepository } from '../repositories/users.repository.js';
import { createUsersService } from '../services/users.service.js';
import { createUsersController } from '../controllers/users.controller.js';
import {createMockUsersRepository} from "../repositories/users.repository.mock.js";

export function buildUsersModule() {
    const usersRepo = createUsersRepository();
    const usersService = createUsersService(usersRepo);
    const usersController = createUsersController(usersService);

    return { usersController };
}
