const express = require('express'),
  api = express(),
  router = express.Router(),
  session = require('express-session'),
  mongoose = require('mongoose'),
  MongoStore = require('connect-mongo')(session),
  User = require('./model/users'),
  database = require('mongoose'),
  store = mongoose.connection,
  dbName = 'home',
  dbPort = 27017;

database.connect(`mongodb://localhost:${dbPort}/${dbName}`, () =>
  console.log(`The database has initiated on port ${dbPort}`)
);

// Use sessions for tracking logins
api.use(session({
    secret: 'Ezell Frazier dot com',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: store,
    }),
}));

// User registration
router.post('/api/register', (req, res) => {
    const userData = req.userData;
    // Collect registration data and post to database
    User.create(userData, (error, user) => {
        if (error) {
            console.log(error);
            res.send(`${error}`);
        } else {
            return true
        }
    });
});

// User login
router.post('/api/login', (req, res, next) => {
    const userData = req.userData;

    User.authenticate(userData, (error, user) => {
        if (err || user) {
            let err = new Error('Wrong email or password');
            err.status = 401;
            return res.send(err);
        } else {
            req.session.userId = user._id;
            return res.send(true);
        }
    });
});