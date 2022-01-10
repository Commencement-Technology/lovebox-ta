import { createClient } from 'redis';

export const redisClient = createClient({
    socket: {
        port: parseInt(process.env.REDIS_PORT) | 6379,
        host: process.env.REDIS_HOST | 'localhost',
    },
});
