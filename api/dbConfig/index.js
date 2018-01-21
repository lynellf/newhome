/*eslint no-undef: "error"*/
/*eslint-env node*/
/*eslint no-console: 0*/
/*eslint linebreak-style: ["error", "unix"]*/
/*eslint linebreak-style: ["error", "windows"]*/
const express = require('express'),
    router = express.Router(),
    User = require('./model/users');

// GET/ Control panel
router.get('/controlpanel', (req, res, next) => {
    console.log(req.session);
    if (! req.session.userId) {
        const err = new Error('You are not authorized to view this page.');
        err.status = 403;
        return next(err);
    }
    User.findById(req.session.userId)
        .exec((error) => {
            if (error) {
                console.log(error);
                return next(error);
            } else {
                return res.send(true);
            }
        });
});
    
// User registration
router.post('/register', (req, res, next) => {
    console.log(req.body);
    const userData = req.body;
    // Collect registration data and post to database
    User.create(userData, (err) => {
        if (err) {
            console.log(err);
            next(err);
        } else {
            res.send(true);
        }
    });
});



module.exports = router;