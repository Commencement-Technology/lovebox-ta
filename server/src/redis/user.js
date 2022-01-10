import { redisClient } from './client';

export const createUser = async user => {
    await redisClient.hSet('users', user.email, JSON.stringify(user));
};

export const getUser = async email => await redisClient.hGet('users', email);

export const deleteUser = async email => await redisClient.hDel('users', email);

export const getAllUsers = async () => await redisClient.hGetAll('users');
