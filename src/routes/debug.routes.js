import { Router } from 'express';
import { prisma } from '../db/prisma.js';

const router = Router();

router.get('/db/ping', async (req, res, next) => {
    try {
        // самый простой запрос
        const result = await prisma.$queryRaw`SELECT 1 as ok`;
        res.json({
            status: 'ok',
            result,
        });
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.post('/db/users', async (req, res, next) => {
    try {
        const name = String(req.body?.name ?? '').trim();
        if (!name) return res.status(400).json({ error: 'name is required' });

        const user = await prisma.user.create({
            data: { name },
        });

        res.status(201).json(user);
    } catch (e) {
        next(e);
    }
});

router.get('/db/users', async (req, res, next) => {
    try {
        const users = await prisma.user.findMany({
            orderBy: { id: 'asc' },
        });

        res.json(users);
    } catch (e) {
        next(e);
    }
});


export default router;
