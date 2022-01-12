import { gql } from '@apollo/client';

export const REGISTER = gql`
    mutation register($email: String!, $password: String!, $username: String!) {
        register(
            user: { email: $email, password: $password, username: $username }
        )
    }
`;

export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password)
    }
`;

export const SEND_MESSAGE = gql`
    mutation($image: Upload!) {
        addMessage(photo: $image)
    }
`;

export const GET_MESSAGES = gql`
    query {
        messages {
            photoUrl
            id
        }
    }
`;
