/*eslint no-undef: "error"*/
/*eslint-env node*/
/*eslint no-console: 0*/
/*eslint linebreak-style: ["error", "unix"]*/
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
            unique: true,
        },
        password: {
            type: String,
            trim: true,
            required: true,
        },
    });

// User authentication
Users.statics.authenticate = function(userData, callback) {
    User.findOne({ email: userData.email })
        .exec(function (error, user) {
            if (error) {
                return callback(error);
            } else if ( !user ) {
                let err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(userData.password, user.password , function(error, result) {
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback();
                }
            });
        });
};

// Hash password before saving to database
Users.pre('save', function(next) {
    const user = this;
    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});

const User = collection.model('User', Users);
module.exports = User;
