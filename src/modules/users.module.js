import { createUsersRepository } from '../repositories/users.repository.js';
import { createUsersService } from '../services/users.service.js';
import { createUsersController } from '../controllers/users.controller.js';
import {createMockUsersRepository} from "../repositories/users.repository.mock.js";
import {createUsersRepositoryPrisma} from "../repositories/users.repository.prisma.js";

export function buildUsersModule() {
    // const usersRepo = createUsersRepository();
    const usersRepo = createUsersRepositoryPrisma();
    const usersService = createUsersService(usersRepo);
    const usersController = createUsersController(usersService);

    return { usersController };
}
