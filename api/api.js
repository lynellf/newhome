/*eslint no-undef: "error"*/
/*eslint-env node*/
/*eslint no-console: 0*/
/*eslint linebreak-style: ["error", "unix"]*/
/*eslint linebreak-style: ["error", "windows"]*/
const express = require('express'),
    api = express(),
    parser = require('body-parser'),
    dbRouter = require('./dbConfig/index'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    apiPort = 3001,
    Project = require('./dbConfig/model/projects'),
    database = require('mongoose'),
    dbName = 'home',
    dbPort = 27017;


// Database listening
database.connect(`mongodb://localhost:${dbPort}/${dbName}`, () =>
    console.log(`The database has initiated on port ${dbPort}`)
);
const store = database.connection;

// parse incoming requests
api.use(parser.json({ limit: '50mb' }));
api.use(parser.urlencoded({ extended: true, limit: '50mb' }));

// POST / New Post
api.post('/api/newpost', function(req, res, next) {
    const projectData = req.body;
    console.log(req.body);
    Project.create(projectData, (err) => {
        if (err) {
            console.log(err);
            next(err);
        } else {
            res.send(true);
        }
    });
});

// Use sessions for tracking all request objects
api.use(session({
    secret: 'Ezell Frazier dot com',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: store,
    }),
}));

// Database routing
api.use('/api', dbRouter);

const User = require('./dbConfig/model/users');

// POST / User login
api.post('/api/login', (req, res, next) => {
    console.log(req.body);
    const userData = req.body;
    User.authenticate(userData, (error, user, err) => {
        if (err) {
            let err = new Error('Wrong email or password');
            err.status = 401;
            next(err);
        } else {
            req.session.userId = user._id;
            return res.send(true);
        }
    });
});

// GET / Logout
api.get('/api/logout', function(req, res, next) {
    console.log(req.session);
    if (req.session) {
    // delete session object
        req.session.destroy(function(err) {
            if(err) {
                return next(err);
            } else {
                return res.send(true);
            }
        });
    }
});

// GET / All Projects
api.get('/api/projects', function(req, res, next) {
    Project.find({}, function(err, docs) {
        if (!err) {
            const results = {
                'posts': {}
            };
            results.posts = docs;
            res.send(results);
        } else {
            res.send(err);
        }
    });
});

// GET / Single Project
api.get('/api/post/:id', function(req, res, next) {
    Project.findOne({_id: req.params.id}, function (err, docs){
        if (!err) {
            const results = {
                'post': {}
            };
            results.post = docs;
            res.send(results);
        } else {
            res.send(err);
        }
    });
});

// POST / Update Project
api.post('/api/update/:id', function(req, res, next) {
    const projectData = req.body;
    console.log(req.body);
    Project.findOneAndUpdate({_id: req.params.id}, projectData, function (err, docs){
        if (!err) {
            const results = {
                'post': {}
            };
            results.post = docs;
            res.send(true);
        } else {
            res.send(err);
        }
    });
});

// GET / Delete Project
api.get('/api/delete/:id', function(req, res, next) {
    Project.findOneAndRemove({ _id: req.params.id }, function (err) {
        if (!err) {
            res.send(true);
        } else {
            res.send(err);
        }
    });
});


api.use('/api/session', function(req, res) {
    console.log(req.session.userId);
    const sessionData = req.session;
    sessionData.currentUser = req.session.userId;
    res.send(sessionData);
});


// 404 not found error handling
api.use(function(req, res, next) {
    res.status(404).send('Sorry can\'t find that!');
});

// Error handler
api.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(`${err.message} ${err.status}`);
});


api.listen( apiPort, () => console.log(`The API is listening on port ${apiPort}`));