const { gql } = require('apollo-server');
const { createTestClient } = require('apollo-server-testing');
const { ApolloServer, schema, redisClient } = require('../server');
import consola from 'consola';
import { deleteUser } from '../redis/user';

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
const SIGN_UP = gql`
    mutation {
        register(
            user: {
                email: "mama@lovebox.love"
                password: "1234567"
                username: "Pakenfit"
            }
        )
    }
`;

beforeAll(async () => await deleteUser('mama@lovebox.love'));
describe('User signup', () => {
    it('Should register user and return true', async () => {
        const { query } = createTestClient(server);
        const res = await query({ query: SIGN_UP });
        expect(res.errors).toBeUndefined();
        expect(res.data).toBeDefined();
        expect(res.data.register).toBeTruthy();
        expect(res).toMatchSnapshot();
    });
});
