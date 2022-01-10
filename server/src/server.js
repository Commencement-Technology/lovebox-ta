import consola from 'consola';
import { ApolloServer } from 'apollo-server-express';
import * as schema from './graphql';
import { verifyToken } from './helpers';
import express from 'express';
import { graphqlUploadExpress } from 'graphql-upload';
import { redisClient } from './redis/client';

const app = express();

app.use(express.static('uploads'));
app.use(graphqlUploadExpress());

consola.info({
    message: `Starting on ${process.env.NODE_ENV} mode`,
    badge: true,
});

const context = async ({ req, res }) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return {
            res,
            req,
            user: null,
        };
    }
    const jwt_token = authorization.split(' ')[1];
    const decoded = verifyToken(jwt_token);
    if (decoded) {
        return {
            res,
            req,
            user: { email: decoded.email },
        };
    }
    return {
        res,
        req,
        user: null,
    };
};

const options = {
    ...schema,
    context,
    uploads: false,
};

if (process.env.NODE_ENV === 'production') {
    Object.assign(options, {
        introspection: false,
        playground: false,
    });
}

const server = new ApolloServer(options);

server.applyMiddleware({ app, path: '/api/graphql' });

export { schema, ApolloServer, app, context, redisClient };
