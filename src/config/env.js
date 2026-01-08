import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
    NODE_ENV: z.string().default('development'),
    PORT: z.coerce.number().int().positive().default(3000),
    APP_NAME: z.string().default('node-api'),
    API_KEY: z.string().default('secret'),
    CORS_ORIGINS: z.string().default(''),
    DATABASE_URL: z.string().min(1),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    // show readable message then crash
    console.error(parsed.error.format());
    throw new Error('Invalid environment variables');
}

export const env = {
    nodeEnv: parsed.data.NODE_ENV,
    port: parsed.data.PORT,
    appName: parsed.data.APP_NAME,
    apiKey: parsed.data.API_KEY,
    corsOrigins: parsed.data.CORS_ORIGINS
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    databaseUrl: parsed.data.DATABASE_URL,
};

if (!env.databaseUrl) {
    throw new Error('DATABASE_URL is required');
}
