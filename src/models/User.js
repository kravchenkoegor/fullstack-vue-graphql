const mongoose = require('mongoose');

// see https://github.com/apollographql/apollo-server/issues/1633
const {ObjectId} = mongoose.Types;
ObjectId.prototype.valueOf = () => this.toString();

const UserSchema = new mongoose.Schema({
  id: String,
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  avatar: {
    type: String
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  favorites: {
    type: ObjectId,
    // required: true,
    ref: 'Post'
  }
})

module.exports = mongoose.model('User', UserSchema);
