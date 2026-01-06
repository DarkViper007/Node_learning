import { env } from './src/config/env.js';


if (!process.env.PORT) {
    throw new Error('PORT is required');
}
console.log(env.GREETING, env.appName);