import 'dotenv/config';

export const env = {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
    appName: process.env.APP_NAME || 'node-api',
};
