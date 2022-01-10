import { ForbiddenError } from 'apollo-server-express';
import argon2 from 'argon2';
import { verify } from 'jsonwebtoken';
import { sign } from 'jsonwebtoken';

/**
 * This file define some helpers functions
 * @param {*} password
 * @returns
 */

export const hashPassword = async password => await argon2.hash(password);

export const verifyPassword = async (hashed, plain) =>
    await argon2.verify(hashed, plain);

export const createToken = email =>
    sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });

export const verifyToken = token => verify(token, process.env.JWT_SECRET);

export const auth_required = context => {
    const user = context.user;
    if (!user) {
        throw new ForbiddenError('Your not allowed to access this resource');
    }
};

export const getFileExtension = filename => {
    const splits = filename.split('.');
    return splits[splits.length - 1];
};
