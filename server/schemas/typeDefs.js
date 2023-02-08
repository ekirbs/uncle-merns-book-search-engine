const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Book {
  authors: [String]
  description: String!
  bookId: String!
  image: String
  link: String
  title: String!
}

type User {
  _id: ID!
  username: String
  email:String
  bookCount: Int
  savedBooks: [Book]
}
  type Auth {
    token: ID!
    user:: User
  }

  type Query {
    me: User
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
      authors: [String],
      description: String,
      bookID: String!,
      image: String,
      likn: String,
      title: String!

    ): User
    deleteBook(
      _id: String!
    ): User
  }

  type Book {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }
`;

module.exports = typeDefs;