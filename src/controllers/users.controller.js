import * as usersService from '../services/users.service.js';
import { validate } from '../validators/validate.js';
import {createUserSchema, userIdParamsSchema} from '../schemas/users.schema.js';
import {searchSchema} from "../schemas/search.schema.js";

export async function getUsers(req, res) {
    const users = await usersService.getUsers();
    res.json(users);
}

export async function createUser(req, res) {
    const dto = validate(createUserSchema, req.body);
    const user = await usersService.createUser(dto);
    res.status(201).json(user);
}

export async function getUserById(req, res) {
    const { id } = validate(userIdParamsSchema, req.params);
    const user = await usersService.getUserById(id);
    res.json(user);
}

export async function deleteUser(req, res) {
    const { id } = validate(userIdParamsSchema, req.params);
    await usersService.deleteUser(id);
    res.sendStatus(204);
}

export function search(req, res) {
    const { term } = validate(searchSchema, {term:req.query.term});
    res.json({ term });
}
