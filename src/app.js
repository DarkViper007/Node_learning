import express from 'express';

import { env } from './config/env.js';
import { addUserRoutes } from './routes/users.routes.js';
import { addSearchRoutes } from './routes/search.routes.js';

import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { requireJson } from './middlewares/requireJson.js';
import { requireApiKey } from './middlewares/requireApiKey.js';

import { health } from './controllers/health.controller.js';
import { buildUsersModule } from './modules/users.module.js';
import {requireJsonAccept} from "./middlewares/requireJsonAccept.js";
import {globalLimiter} from "./middlewares/rateLimiters.js";

export function createApp() {
    const app = express();

    app.use(globalLimiter);
    app.use(express.json());

    // app.use(requireJsonAccept);

    app.get('/health', health);

    const usersModule = buildUsersModule();

    addUserRoutes(app, {
        usersController: usersModule.usersController,
        requireApiKeyMw: requireApiKey(env.apiKey),
        requireJsonMw: requireJson,
    });

    addSearchRoutes(app);

    app.use(notFound);
    app.use(errorHandler);

    return app;
}


