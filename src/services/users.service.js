import { HttpError } from '../errors/httpError.js';
import * as usersRepo from '../repositories/users.repository.js';

export async function getUsers() {
    return await usersRepo.findAll();
}

export async function getUserById(id) {
    const user = await usersRepo.findById(id);
    if (!user) throw new HttpError(404, 'user not found');
    return user;
}

export async function createUser(dto) {
    const exists = await usersRepo.findByName(dto.name);
    if (exists) throw new HttpError(409, 'user with name already exists');

    const user = { id: usersRepo.getNextId(), name: dto.name };
    return await usersRepo.create(user);
}

export async function deleteUser(id) {
    const ok = await usersRepo.removeById(id);
    if (!ok) throw new HttpError(404, 'user not found');
}

