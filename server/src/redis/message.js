import { redisClient } from './client';

export const addMessage = async message =>
    await redisClient.hSet('messages', message.id, JSON.stringify(message));

export const getMessage = async id => await redisClient.hGet('messages', id);

export const deleteMessage = async id => await redisClient.hDel('messages', id);

export const getAllMessages = async () => await redisClient.hGetAll('messages');
