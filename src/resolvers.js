require('dotenv').config();
const jwt = require('jsonwebtoken');

function createToken(user, secret, expiresIn) {
  const {username, email} = user;
  return jwt.sign({username, email}, secret, {expiresIn});
}

module.exports = {
  Query: {
    getCurrentUser: async (_, args, {User, currentUser}) => {
      if (!currentUser) {
        return null;
      }

      return await User.findOne({username: currentUser.username}).populate({
        path: 'favorites',
        model: 'Post'
      });
    },
    getPosts: async (_, args, {Post}) => {
      return await Post.find({})
        .sort({createdDate: 'asc'})
        .populate({
          path: 'createdBy',
          model: 'User'
        })
    }
  },
  Mutation: {
    addPost: async (_, args, context) => {
      const {title, imageUrl, categories, description, creatorId} = args;
      const {Post} = context;

      return await new Post({title, imageUrl, categories, description, createdBy: creatorId}).save();
    },
    register: async (_, args, context) => {
      const {username, email, password} = args;
      const {User} = context;

      const user = await User.findOne({username});

      if (!user) {
        const newUser = await new User({username, email, password}).save();
        return {
          token: createToken(newUser, process.env.JWT_SECRET, '1h')
        };
      } else {
        throw new Error('User already exists');
      }
    },
    login: async (_, args, context) => {
      const {username, password} = args;
      const {User} = context;

      const user = await User.findOne({username});

      if (!user) {
        throw new Error(`User doesn't exists`);
      } else {
        if (user.password === password) {
          return {
            token: createToken(user, process.env.JWT_SECRET, '1h')
          };
        } else {
          throw new Error(`Wrong password. Please try again`);
        }
      }
    }
  }
}
