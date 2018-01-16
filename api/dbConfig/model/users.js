const collection = require('mongoose'),
  bcrypt = require('bcrypt'),
  Users = new collection.Schema({
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
  });

// User authentication

Users.statics.authenticate = (email, password, callback) => {
  User.findOne({ email: email }).exec((error, user) => {
    console.log(user);
    if (error) {
      return callback(error);
    } else if (!user) {
      const err = new Error('User not found');
      err.status = 401;
      return callback(err);
    }
    bcrypt.compare(password, user.password, (error, result) => {
      if (result === true) {
        return callback(null, user);
      } else {
        return callback();
      }
    });
  });
};

// Hash password before saving to database

Users.pre('save', next => {
  const user = this;
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

User = collection.model('User', Users);
module.exports = User;
