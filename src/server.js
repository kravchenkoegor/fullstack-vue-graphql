require('dotenv').config();
const fs = require('fs');
const path = require('path');
const {ApolloServer, AuthenticationError} = require('apollo-server');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Import Mongoose models
const User = require('./models/User');
const Post = require('./models/Post');

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {useNewUrlParser: true})
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log(error));

// Import typeDefs and resolvers
const typeDefs = fs.readFileSync(path.join(__dirname, 'typeDefs.gql'), 'utf-8');
const resolvers = require('./resolvers');

const getUser = async (token) => {
  if (token) {
    try {
      return await jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new AuthenticationError('Your session has expired.');
    }
  }
}

// Start Apollo/GraphQL Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req}) => {
    const token = req.headers['authorization'];
    return {
      User,
      Post,
      currentUser: await getUser(token)
    };
  }
});

server.listen()
  .then(({url}) => console.log(`Server is listening on ${url}`));
