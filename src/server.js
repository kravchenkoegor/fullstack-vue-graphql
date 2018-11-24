require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

// Import Mongoose models
const User = require('./models/User');
const Post = require('./models/Post');

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log(error));

// Import typeDefs and resolvers
const typeDefs = fs.readFileSync(path.join(__dirname, 'typeDefs.gql'), 'utf-8');
const resolvers = require('./resolvers');

// Start Apollo/GraphQL Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { User, Post }
});

server.listen()
    .then(({url}) => console.log(`Server is listening on ${url}`));