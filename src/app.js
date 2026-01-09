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
import helmet from 'helmet';
import cors from 'cors';
import {HttpError} from "./errors/httpError.js";
import debugRoutes from "./routes/debug.routes.js";
import {buildProductsModule} from "./modules/products.module.js";
import {addProductRoutes} from "./routes/products.routes.js";
import {buildOrdersModule} from "./modules/orders.module.js";
import {addOrderRoutes} from "./routes/orders.routes.js";

export function createApp() {
    const app = express();

    app.use(globalLimiter);
    app.use(helmet());
    app.use(
        cors({
            origin(origin, cb) {
                if (!origin) return cb(null, true);
                if (env.corsOrigins.includes(origin)) return cb(null, true);
                return cb(new HttpError(403, 'Not allowed by CORS'));
            },
            credentials: true,
            methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'X-API-Key'],
        })
    );
    app.options(/.*/, cors());

    app.use(express.json());
    // app.use(requireJsonAccept);

    app.get('/health', health);
    app.use('/debug', debugRoutes);

    const usersModule = buildUsersModule();

    addUserRoutes(app, {
        usersController: usersModule.usersController,
        requireApiKeyMw: requireApiKey(env.apiKey),
        requireJsonMw: requireJson,
    });

    const productsModule = buildProductsModule();

    addProductRoutes(app, {
        productsController: productsModule.productsController,
        requireJsonMw: requireJson,
    });

    const ordersModule = buildOrdersModule({
        usersRepo: usersModule.usersRepo,
    });

    addOrderRoutes(app, {
        ordersController: ordersModule.ordersController,
        requireJsonMw: requireJson,
    });

    addSearchRoutes(app);

    app.use(notFound);
    app.use(errorHandler);

    return app;
}


