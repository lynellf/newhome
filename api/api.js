/*eslint no-undef: "error"*/
/*eslint-env node*/
/*eslint no-console: 0*/
/*eslint linebreak-style: ["error", "unix"]*/
const express = require('express'),
    api = express(),
    parser = require('body-parser'),
    multer = require('multer'),
    dbRouter = require('./dbConfig/index'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    apiPort = 3001,
    Project = require('./dbConfig/model/projects'),
    database = require('mongoose'),
    dbName = 'home',
    dbPort = 27017;

// File uploads
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, '../client/public/img');
    },
    filename: function(req, file, cb) {
        cb(null, (fileName = file.originalname));
        fileName;
        console.log(fileName); // Appending extension
    },
});


const upload = multer({ storage: storage }).array('image', 100);

api.post('/api/imageupload', function(req, res) {
    console.log(req.body);
    upload(req, res, function(err) {
        if(err) {
            return res.send('Error uploading file(s)');
        } else {
            return res.send('File is uploaded');
        }
    });
});



// Database listening

database.connect(`mongodb://localhost:${dbPort}/${dbName}`, () =>
    console.log(`The database has initiated on port ${dbPort}`)
);
const store = database.connection;

// parse incoming requests
api.use(parser.json());
api.use(parser.urlencoded({ extended: false }));

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