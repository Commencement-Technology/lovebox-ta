const { gql } = require('apollo-server');
const { createTestClient } = require('apollo-server-testing');
const { ApolloServer, schema, redisClient } = require('../server');
import consola from 'consola';

const server = new ApolloServer({ ...schema, uploads: false });
redisClient
    .connect()
    .then(() =>
        consola.ready({
            message: 'Redis client is connected successfully',
            badge: true,
        })
    )
    .catch(error =>
        consola.error({
            message: `An error occured when connecting Redis client ${error}`,
            badge: true,
        })
    );
const GET_MESSAGES = gql`
    query {
        messages {
            photoUrl
            id
        }
    }
`;

describe('Get messages without token', () => {
    it('Should return error not allowed to access the resource', async () => {
        const { query } = createTestClient(server);
        const res = await query({ query: GET_MESSAGES });
        expect(res.data.messages).toBeNull();
        expect(res.errors).toBeDefined();
        expect(res.errors[0].message).toBe(
            'Your not allowed to access this resource'
        );
        expect(res).toMatchSnapshot();
    });
});
