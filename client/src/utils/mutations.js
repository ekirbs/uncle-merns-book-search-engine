import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($user: [ID]!) {
    createUser(user: $users) {
      username
    }
  }
`

export const SAVE_BOOK = gql`
  mutation saveBook($book: )
`

export const DELETE_BOOK = gql`
  mutation deleteBook($book: [ID]!)
`