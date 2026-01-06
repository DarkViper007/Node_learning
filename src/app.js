import express from 'express';
import { addUserRoutes } from './routes/users.routes.js';
import { addSearchRoutes } from './routes/search.routes.js';

import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';

import { health } from './controllers/health.controller.js';

export function createApp() {
    const app = express();

    app.use(express.json());

    app.get('/health', health);

    addUserRoutes(app);
    addSearchRoutes(app);

    // After all routes:
    app.use(notFound);

    // Central error handler MUST be last:
    app.use(errorHandler);

    return app;
}

