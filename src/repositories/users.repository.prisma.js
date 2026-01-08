import { prisma } from '../db/prisma.js';

export function createUsersRepositoryPrisma() {
    return {
        async findAll() {
            return prisma.user.findMany({ orderBy: { id: 'asc' } });
        },

        async findById(id) {
            return prisma.user.findUnique({ where: { id } });
        },

        async findByName(name) {
            const needle = name.trim().toLowerCase();
            return prisma.user.findFirst({
                where: { name: { equals: needle, mode: 'insensitive' } },
            });
        },

        async create(user) {
            return prisma.user.create({
                data: { name: user.name.trim() },
            });
        },

        async removeById(id) {
            try {
                await prisma.user.delete({ where: { id } });
                return true;
            } catch (e) {
                return false;
            }
        },
    };
}
