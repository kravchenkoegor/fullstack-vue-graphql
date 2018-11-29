const mongoose = require('mongoose');
const md5 = require('md5');

// see https://github.com/apollographql/apollo-server/issues/1633
const {ObjectId} = mongoose.Schema.Types;
ObjectId.prototype.valueOf = function () {
  return this.toString()
};

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
    default: new Date()
  },
  favorites: [{
    type: ObjectId,
    required: true,
    ref: 'Post'
  }]
});

UserSchema.pre('save', function (next) {
  this.avatar = `http://gravatar.com/avatar/${md5(this.username)}?d=identicon`;
  next();
});

// UserSchema.pre('save', function (next) {
//   if (!this.isModified('password')) {
//     return next();
//   }
//
//   bcrypt.genSalt(10, (error, salt) => {
//     if (error) {
//       return next(error);
//     }
//
//     bcrypt.hash(this.password, salt, (err, hash) => {
//       if (err) {
//         return next(err);
//       }
//
//       this.password = hash;
//       next();
//     })
//   })
// });

module.exports = mongoose.model('User', UserSchema);
