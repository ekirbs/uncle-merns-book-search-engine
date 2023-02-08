const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
// const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {

  Query: {
    users: async () => {
      return await User.find({});
    },
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in.")
    }
    // user: async (parent, args, context) => {
    //   if (context.user) {
    //     const user = await User
    //       .findById(context.user._id);

    //     return user;
    //   }

    //   throw new AuthenticationError('Not logged in');
    // },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    createUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, { books }, context) => {
      console.log(context);
      if (context.user) {
        const book = new Book({ books });

        await User.findByIdAndUpdate(context.user._id, { $push: { books: book } });

        return book;
      }

      throw new AuthenticationError('Not logged in');
    },
    deleteBook: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
  }
};

module.exports = resolvers;
