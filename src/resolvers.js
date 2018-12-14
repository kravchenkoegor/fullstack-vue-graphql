require('dotenv').config();
const jwt = require('jsonwebtoken');
const moment = require('moment');

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
        .sort({createdDate: 'desc'})
        .populate({
          path: 'createdBy',
          model: 'User'
        })
    },
    infiniteScrollPosts: async (_, {pageNum, pageSize}, {Post}) => {
      let posts;

      if (pageNum === 1) {
        posts = await Post.find({})
          .sort({createdDate: 'desc'})
          .populate({
            path: 'createdBy',
            model: 'User'
          })
          .limit(pageSize);
      } else {
        const skips = pageSize * (pageNum - 1);

        posts = await Post.find({})
          .sort({createdDate: 'desc'})
          .populate({
            path: 'createdBy',
            model: 'User'
          })
          .skip(skips)
          .limit(pageSize);
      }

      const totalPosts = await Post.countDocuments();
      const hasMore = totalPosts > pageSize * pageNum;

      return {posts, hasMore};
    },
    getPost: async (_, {postId}, {Post}) => {
      return await Post.findOne({_id: postId}).populate({
        path: 'messages.messageUser',
        model: 'User'
      })
    },
    getUserPosts: async (_, {userId}, {Post}) => {
      return await Post.find({createdBy: userId}).sort({createdDate: 'desc'})
    },
    searchPosts: async (_, {searchText}, {Post}) => {
      if (searchText) {
        return await Post.find(
          // perform text search
          {$text: { $search: searchText }},
          // assign 'searchText' a text score to provide best match
          {score: { $meta: 'textScore' }}
          // sort result according to a text score and by likes in descending order
        ).sort({
          score: { $meta: 'textScore' },
          likes: 'desc'
        })
          .limit(5);
      }
    }
  },
  Mutation: {
    addPost: async (_, args, context) => {
      const {title, imageUrl, categories, description, creatorId} = args;
      const {Post} = context;

      return await new Post({
        title,
        imageUrl,
        categories,
        description,
        createdDate: moment().format('DD MMMM YYYY'),
        createdBy: creatorId
      }).save();
    },
    updatePost: async (_, args, context) => {
      const {postId, userId, title, imageUrl, categories, description} = args;
      const {Post} = context;

      return await Post.findOneAndUpdate(
        {_id: postId, createdBy: userId},
        { $set: {
            title,
            imageUrl,
            categories,
            description
          }
        },
        {new: true}
      )
    },
    deletePost: async (_, args, context) => {
      const {postId} = args;
      const {Post} = context;

      return await Post.findOneAndRemove({_id: postId})

    },
    addPostMessage: async (_, args, context) => {
      const {messageBody, userId, postId} = args;
      const {Post} = context;

      const newMessage = {
        messageBody,
        messageDate: moment().format('DD MMMM YYYY HH:mm'),
        messageUser: userId
      };

      const post = await Post.findOneAndUpdate(
        // find post by id
        {_id: postId},
        // push a new message to the beginning of messages array
        {
          $push: {
            messages: {
              $each: [newMessage], $position: 0
            }
          }
        },
        // return updated document
        {new: true}
      ).populate({
        path: 'messages.messageUser',
        model: 'User'
      });

      return post.messages[0];
    },
    likePost: async (_, args, context) => {
      const {postId, username} = args;
      const {Post, User} = context;

      const post = await Post.findOneAndUpdate(
        {_id: postId},
        {$inc: { likes: 1 }},
        {new: true}
      );

      const user = await User.findOneAndUpdate(
        {username},
        {$addToSet: { favorites: postId }},
        {new: true}
      ).populate({
        path: 'favorites',
        model: 'Post'
      });

      return {
        likes: post.likes,
        favorites: user.favorites
      }
    },
    unlikePost: async (_, args, context) => {
      const {postId, username} = args;
      const {Post, User} = context;

      const post = await Post.findOneAndUpdate(
        {_id: postId},
        {$inc: { likes: -1 }},
        {new: true}
      );

      const user = await User.findOneAndUpdate(
        {username},
        {$pull: { favorites: postId }},
        {new: true}
      ).populate({
        path: 'favorites',
        model: 'Post'
      });

      return {
        likes: post.likes,
        favorites: user.favorites
      }
    },
    register: async (_, args, context) => {
      const {username, email, password} = args;
      const {User} = context;

      const user = await User.findOne({username});

      if (!user) {
        const newUser = await new User({
          username,
          email,
          password,
          joinDate: moment().format('DD MMMM YYYY')
        }).save();
        return {
          token: createToken(newUser, process.env.JWT_SECRET, '1d')
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
            token: createToken(user, process.env.JWT_SECRET, '1d')
          };
        } else {
          throw new Error(`Wrong password. Please try again`);
        }
      }
    }
  }
}
