import { HttpError } from '../errors/httpError.js';

const forbiddenNames = new Set(['admin', 'root', 'system']);

export function createUsersService(usersRepo) {
    return {
        async getUsers() {
            return await usersRepo.findAll();
        },

        async getUserById(id) {
            const user = await usersRepo.findById(id);
            if (!user) throw new HttpError(404, 'user not found');
            return user;
        },

        async createUser(dto) {
            const normalized = dto.name.trim().toLowerCase();

            if (forbiddenNames.has(normalized)) {
                throw new HttpError(422, 'name is forbidden');
            }

            const exists = await usersRepo.findByName(dto.name);
            if (exists) throw new HttpError(409, 'user with name already exists');

            const user = { id: usersRepo.getNextId(), name: dto.name };
            return await usersRepo.create(user);
        },

        async deleteUser(id) {
            const ok = await usersRepo.removeById(id);
            if (!ok) throw new HttpError(404, 'user not found');
        },
    };
}


