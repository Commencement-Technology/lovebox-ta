import { merge } from 'lodash-es';
import { gql } from 'apollo-server';
import { UserResolvers } from './resolvers/user';
import { MessageResolvers } from './resolvers/message';
import { EmailAddressResolver } from 'graphql-scalars';
import cacheControl from './schema/cache.gql';
import UserType from './schema/user/type.gql';
import MessageType from './schema/message/type.gql';

const Types = gql`
    scalar EmailAddress
`;
export const typeDefs = [
    Types,
    gql`
        ${cacheControl}
    `,
    gql`
        ${UserType}
    `,
    gql`
        scalar Upload
        ${MessageType}
    `,
];
export const resolvers = merge(
    { EmailAddress: EmailAddressResolver },
    UserResolvers,
    MessageResolvers
);
