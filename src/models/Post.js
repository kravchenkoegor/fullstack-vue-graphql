const mongoose = require('mongoose');

// see https://github.com/apollographql/apollo-server/issues/1633
const {ObjectId} = mongoose.Types;
ObjectId.prototype.valueOf = function() {
  return this.toString()
}

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  categories: {
    type: [String],
    required: true
  },
  description: {
    type: String
  },
  createdDate: {
    type: Date,
    default: new Date()
  },
  likes: {
    type: Number,
    default: 0
  },
  // property ('createdBy') === path
  // ref ('User') === model
  createdBy: {
    type: ObjectId,
    required: true,
    ref: 'User'
  },
  messages: [{
    messageBody: {
      type: String,
      required: true
    },
    messageDate: {
      type: Date,
      default: new Date()
    },
    messageUser: {
      type: ObjectId,
      required: true,
      ref: 'User'
    }
  }]
});

PostSchema.index({
  // to search the text through all fields
  '$**': 'text'
})

module.exports = mongoose.model('Post', PostSchema);
