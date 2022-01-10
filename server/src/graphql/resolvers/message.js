import { addMessage, getMessage, getAllMessages } from '../../redis/message';

import { v4 as uuidv4 } from 'uuid';
import consola from 'consola';
import { auth_required, getFileExtension } from '../../helpers';
import { GraphQLUpload } from 'graphql-upload';
import fs from 'fs';

/**
 * Message resolvers
 */
export const MessageResolvers = {
    Upload: GraphQLUpload,
    Query: {
        messages: async (_, args, context) => {
            /*In rest I manage that by using middleware but with
            graphql I don't kow exactly.*/
            auth_required(context);
            try {
                const messages = await getAllMessages();
                return Object.values(messages).map(message =>
                    JSON.parse(message)
                );
            } catch (error) {
                throw error;
            }
        },
        message: async (_, { id }, context) => {
            auth_required(context);
            try {
                const message = await getMessage(id);
                if (!message) {
                    throw new Error('This message does not exist');
                }
                return JSON.parse(message);
            } catch (error) {
                throw error;
            }
        },
    },

    Mutation: {
        addMessage: async (_, args, context) => {
            auth_required(context);
            const { photo } = args;
            try {
                const { createReadStream, filename } = await photo;

                const stream = createReadStream();
                const id = uuidv4();
                const new_file_name = id + '.' + getFileExtension(filename);
                const out = fs.createWriteStream('uploads/' + new_file_name);
                stream.pipe(out);
                out.on('finish', () => consola.info('writing finished'));

                const message = {
                    photoUrl: `http://${process.env.HOST}:${process.env.SERVER_PORT}/${new_file_name}`,
                    id,
                    createdAt: new Date(),
                };

                await addMessage(message);
                return true;
            } catch (error) {
                consola.error(error);
                return false;
            }
        },
    },
};
