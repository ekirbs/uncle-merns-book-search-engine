const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Auth {
    token: ID
    user:: User
  }

  type Query {
    user: [User]
  }

  type Mutation {
    createUser(
      username: String!,
      email: String!,
      password: String!
    ): Auth
    login(
      email: String!,
      password: String!
    ): Auth
    saveBook(
      _id: String!,
      techNum: Int!
    ): Book
    deleteBook(
      _id: String!
    ): Book
  }
`;

module.exports = typeDefs;