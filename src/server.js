require('dotenv').config();
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const {ApolloServer} = require('apollo-server');
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
      console.error('Your session has expired.')
    }
  }
}

// Start Apollo/GraphQL Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: error => ({
    name: error.name,
    message: error.message.replace('Context creation failed: ', '')
  }),
  context: async ({req}) => {
    const token = req.headers['authorization'];
    return {
      User,
      Post,
      currentUser: await getUser(token) || null
    };
  }
});

console.log(`server.js ${process.env.HOST}`)
server.listen({host: process.env.HOST, port: 4000})
  .then(({url}) => console.log(`Apollo Server is listening on ${url}`));

const app = express();
app.use(router);
app.use('/static', express.static(path.join(__dirname, '/static')));
app.listen(process.env.PORT || 5000);
console.log(`Express server is listening on port ${process.env.PORT || 5000}`);

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/static/index.html'))
});

