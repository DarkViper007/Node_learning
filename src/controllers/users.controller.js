import { validate } from '../validators/validate.js';
import { createUserSchema, userIdParamsSchema } from '../schemas/users.schema.js';
import {searchSchema} from "../schemas/search.schema.js";

export function createUsersController(usersService) {
    return {
        getUsers: async (req, res) => {
            const users = await usersService.getUsers();
            res.json(users);
        },

        getUserById: async (req, res) => {
            const { id } = validate(userIdParamsSchema, req.params);
            const user = await usersService.getUserById(id);
            res.json(user);
        },

        createUser: async (req, res) => {
            const dto = validate(createUserSchema, req.body);
            const user = await usersService.createUser(dto);
            res.status(201).json(user);
        },

        deleteUser: async (req, res) => {
            const { id } = validate(userIdParamsSchema, req.params);
            await usersService.deleteUser(id);
            res.sendStatus(204);
        },
    };
}

export function search(req, res) {
    const { term } = validate(searchSchema, {term:req.query.term});
    res.json({ term });
}
