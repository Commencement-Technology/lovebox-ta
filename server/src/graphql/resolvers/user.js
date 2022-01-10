import { createUser, getUser, getAllUsers } from '../../redis/user';
import { v4 as uuidv4 } from 'uuid';
import { createToken, hashPassword, verifyPassword } from '../../helpers';
import consola from 'consola';
import {
    UserInputError,
    ForbiddenError,
    ValidationError,
} from 'apollo-server-express';

/**
 * User resolvers
 */

export const UserResolvers = {
    Query: {
        users: async (_, args) => {
            try {
                const users = await getAllUsers();
                return Object.values(users).map(user => JSON.parse(user));
            } catch (error) {
                consola.error(error);
                return [];
            }
        },
        user: async (_, { email }) => {
            try {
                const user = await getUser(email);
                return JSON.parse(user);
            } catch (error) {
                consola.error(error);
                return null;
            }
        },
        me: async (_, args, { user }) => {
            if (!user) {
                throw new ForbiddenError('You are not connected');
            }
            try {
                const me = await getUser(user.email);
                return JSON.parse(me);
            } catch (error) {
                throw error;
            }
        },
    },

    Mutation: {
        register: async (_, { user }) => {
            const { password, email } = user;

            try {
                const userInDB = await getUser(email);
                if (userInDB) {
                    throw new ForbiddenError('This user already exists');
                }
                const new_user = {
                    ...user,
                    password: await hashPassword(password),
                    id: uuidv4(),
                    joinDate: new Date(),
                };
                await createUser(new_user);
                return true;
            } catch (error) {
                throw error;
            }
        },

        login: async (_, { email, password }) => {
            if (!email || !password) {
                throw new UserInputError('Please provide your credentials');
            }
            try {
                const user = JSON.parse(await getUser(email));
                if (!user) {
                    throw new ForbiddenError('This user does not exist');
                }
                if (!(await verifyPassword(user.password, password))) {
                    throw new ValidationError('Your password is incorrect');
                }
                return createToken(email);
            } catch (error) {
                throw error;
            }
        },
    },
};
