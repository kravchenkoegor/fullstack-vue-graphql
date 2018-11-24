module.exports = {
  Query: {
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
    signupUser: async (_, args, context) => {
      const {username, email, password} = args;
      const {User} = context;

      const user = await User.findOne({username});

      if (!user) {
        const newUser = new User({username, email, password}).save();
        return newUser;
      } else {
        throw new Error('User already exists');
      }
    }
  }
}
