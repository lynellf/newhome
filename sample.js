function router() {
  'use strict';
  const mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    express = require('express'),
    mid = require('../middleware'),
    router = express.Router(),
    User = require('../models/userdb'),
    savedDeck = require('../models/saveFiles');

  //POST/Register
  router.post('/register', function(req, res) {
    if (
      req.body.userEmail &&
      req.body.firstName &&
      req.body.lastName &&
      req.body.password &&
      req.body.confirmPassword
    ) {
      //confirm user entered the same password twice
      if (req.body.password !== req.body.confirmPassword) {
        let err = new Error("Passwords don't match.");
        err.status = 400;
        return next(err);
      }
      //user info object
      const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userEmail: req.body.userEmail,
        password: req.body.password,
      };
      //Collect registration form data and post to database
      User.create(userData, function(error, user) {
        if (error) {
          console.log(error);
          res.send('An Error Occured');
        } else {
          return res.redirect('/');
        }
      });
    } else {
      let err = new Error('All fields are required.');
      err.status = 400;
      return next(err);
    }
  });

  //POST/login
  router.post('/login', function(req, res, next) {
    if (req.body.userEmail && req.body.password) {
      User.authenticate(req.body.userEmail, req.body.password, function(
        error,
        user
      ) {
        if (error || !user) {
          let err = new Error('Wrong email or password.');
          err.status = 401;
          return next(err);
        } else {
          req.session.userId = user._id;
          return res.redirect('/profile');
        }
      });
    } else {
      let err = new Error('Email and password are required.');
      err.status = 401;
      return next(err);
    }
  });
  //POST/App Save Deck
  router.post('/saveDeck', function(req, res) {
    let data = {
        userId: req.session.userId,
        fileName: req.body.fileName,
        cardNames: req.body.cardNames,
        cardLimit: req.body.cardLimit,
        unCost: req.body.unCost,
        unAdv: req.body.unAdv,
        restCost: req.body.restCost,
        restAdv: req.body.restAdv,
        singleCardtickA: req.body.singleCardtickA,
        singleCardtickB: req.body.singleCardtickB,
        singleCardtickC: req.body.singleCardtickC,
        singleCardtickD: req.body.singleCardtickD,
        twoCardTickA1: req.body.twoCardTickA1,
        twoCardTickA2: req.body.twoCardTickA2,
        twoCardTickB1: req.body.twoCardTickB1,
        twoCardTickB2: req.body.twoCardTickB2,
        twoCardTickC1: req.body.twoCardTickC1,
        twoCardTickC2: req.body.twoCardTickC2,
        twoCardTickD1: req.body.twoCardTickD1,
        twoCardTickD2: req.body.twoCardTickD2,
        threeCardTickA1: req.body.threeCardTickA1,
        threeCardTickA2: req.body.threeCardTickA2,
        threeCardTickA3: req.body.threeCardTickA3,
        threeCardTickB1: req.body.threeCardTickB1,
        threeCardTickB2: req.body.threeCardTickB2,
        threeCardTickB3: req.body.threeCardTickB3,
        threeCardTickC1: req.body.threeCardTickC1,
        threeCardTickC2: req.body.threeCardTickC2,
        threeCardTickC3: req.body.threeCardTickC3,
        threeCardTickD1: req.body.threeCardTickD1,
        threeCardTickD2: req.body.threeCardTickD2,
        threeCardTickD3: req.body.threeCardTickD3,
        fourCardTickA1: req.body.fourCardTickA1,
        fourCardTickA2: req.body.fourCardTickA2,
        fourCardTickA3: req.body.fourCardTickA3,
        fourCardTickA4: req.body.fourCardTickA4,
        fourCardTickB1: req.body.fourCardTickB1,
        fourCardTickB2: req.body.fourCardTickB2,
        fourCardTickB3: req.body.fourCardTickB3,
        fourCardTickB4: req.body.fourCardTickB4,
        fourCardTickC1: req.body.fourCardTickC1,
        fourCardTickC2: req.body.fourCardTickC2,
        fourCardTickC3: req.body.fourCardTickC3,
        fourCardTickC4: req.body.fourCardTickC4,
        fourCardTickD1: req.body.fourCardTickD1,
        fourCardTickD2: req.body.fourCardTickD2,
        fourCardTickD3: req.body.fourCardTickD3,
        fourCardTickD4: req.body.fourCardTickD4,
        singleCardPreReqA: req.body.singleCardPreReqA,
        singleCardPreReqB: req.body.singleCardPreReqB,
        singleCardPreReqC: req.body.singleCardPreReqC,
        singleCardPreReqD: req.body.singleCardPreReqD,
        twoCardPreReqA: req.body.twoCardPreReqA,
        twoCardPreReqB: req.body.twoCardPreReqB,
        twoCardPreReqC: req.body.twoCardPreReqC,
        twoCardPreReqD: req.body.twoCardPreReqD,
        threeCardPreReqA: req.body.threeCardPreReqA,
        threeCardPreReqB: req.body.threeCardPreReqB,
        threeCardPreReqC: req.body.threeCardPreReqC,
        threeCardPreReqD: req.body.threeCardPreReqD,
        fourCardPreReqA: req.body.fourCardPreReqA,
        fourCardPreReqB: req.body.fourCardPreReqB,
        fourCardPreReqC: req.body.fourCardPreReqC,
        fourCardPreReqD: req.body.fourCardPreReqD,
        singleMinCardInputA: req.body.singleMinCardInputA,
        singleMinCardInputB: req.body.singleMinCardInputB,
        singleMinCardInputC: req.body.singleMinCardInputC,
        singleMinCardInputD: req.body.singleMinCardInputD,
        twoMinCardInputA1: req.body.twoMinCardInputA1,
        twoMinCardInputA2: req.body.twoMinCardInputA2,
        twoMinCardInputB1: req.body.twoMinCardInputB1,
        twoMinCardInputB2: req.body.twoMinCardInputB2,
        twoMinCardInputC1: req.body.twoMinCardInputC1,
        twoMinCardInputC2: req.body.twoMinCardInputC2,
        twoMinCardInputD1: req.body.twoMinCardInputD1,
        twoMinCardInputD2: req.body.twoMinCardInputD2,
        threeMinCardInputA1: req.body.threeMinCardInputA1,
        threeMinCardInputA2: req.body.threeMinCardInputA2,
        threeMinCardInputA3: req.body.threeMinCardInputA3,
        threeMinCardInputB1: req.body.threeMinCardInputB1,
        threeMinCardInputB2: req.body.threeMinCardInputB2,
        threeMinCardInputB3: req.body.threeMinCardInputB3,
        threeMinCardInputC1: req.body.threeMinCardInputC1,
        threeMinCardInputC2: req.body.threeMinCardInputC2,
        threeMinCardInputC3: req.body.threeMinCardInputC3,
        threeMinCardInputD1: req.body.threeMinCardInputD1,
        threeMinCardInputD2: req.body.threeMinCardInputD2,
        threeMinCardInputD3: req.body.threeMinCardInputD3,
        fourMinCardInputA1: req.body.fourMinCardInputA1,
        fourMinCardInputA2: req.body.fourMinCardInputA2,
        fourMinCardInputA3: req.body.fourMinCardInputA3,
        fourMinCardInputA4: req.body.fourMinCardInputA4,
        fourMinCardInputB1: req.body.fourMinCardInputB1,
        fourMinCardInputB2: req.body.fourMinCardInputB2,
        fourMinCardInputB3: req.body.fourMinCardInputB3,
        fourMinCardInputB4: req.body.fourMinCardInputB4,
        fourMinCardInputC1: req.body.fourMinCardInputC1,
        fourMinCardInputC2: req.body.fourMinCardInputC2,
        fourMinCardInputC3: req.body.fourMinCardInputC3,
        fourMinCardInputC4: req.body.fourMinCardInputC4,
        fourMinCardInputD1: req.body.fourMinCardInputD1,
        fourMinCardInputD2: req.body.fourMinCardInputD2,
        fourMinCardInputD3: req.body.fourMinCardInputD3,
        fourMinCardInputD4: req.body.fourMinCardInputD4,
        singleMaxCardInputA: req.body.singleMaxCardInputA,
        singleMaxCardInputB: req.body.singleMaxCardInputB,
        singleMaxCardInputC: req.body.singleMaxCardInputC,
        singleMaxCardInputD: req.body.singleMaxCardInputD,
        twoMaxCardInputA1: req.body.twoMaxCardInputA1,
        twoMaxCardInputA2: req.body.twoMaxCardInputA2,
        twoMaxCardInputB1: req.body.twoMaxCardInputB1,
        twoMaxCardInputB2: req.body.twoMaxCardInputB2,
        twoMaxCardInputC1: req.body.twoMaxCardInputC1,
        twoMaxCardInputC2: req.body.twoMaxCardInputC2,
        twoMaxCardInputD1: req.body.twoMaxCardInputD1,
        twoMaxCardInputD2: req.body.twoMaxCardInputD2,
        threeMaxCardInputA1: req.body.threeMaxCardInputA1,
        threeMaxCardInputA2: req.body.threeMaxCardInputA2,
        threeMaxCardInputA3: req.body.threeMaxCardInputA3,
        threeMaxCardInputB1: req.body.threeMaxCardInputB1,
        threeMaxCardInputB2: req.body.threeMaxCardInputB2,
        threeMaxCardInputB3: req.body.threeMaxCardInputB3,
        threeMaxCardInputC1: req.body.threeMaxCardInputC1,
        threeMaxCardInputC2: req.body.threeMaxCardInputC2,
        threeMaxCardInputC3: req.body.threeMaxCardInputC3,
        threeMaxCardInputD1: req.body.threeMaxCardInputD1,
        threeMaxCardInputD2: req.body.threeMaxCardInputD2,
        threeMaxCardInputD3: req.body.threeMaxCardInputD3,
        fourMaxCardInputA1: req.body.fourMaxCardInputA1,
        fourMaxCardInputA2: req.body.fourMaxCardInputA2,
        fourMaxCardInputA3: req.body.fourMaxCardInputA3,
        fourMaxCardInputA4: req.body.fourMaxCardInputA4,
        fourMaxCardInputB1: req.body.fourMaxCardInputB1,
        fourMaxCardInputB2: req.body.fourMaxCardInputB2,
        fourMaxCardInputB3: req.body.fourMaxCardInputB3,
        fourMaxCardInputB4: req.body.fourMaxCardInputB4,
        fourMaxCardInputC1: req.body.fourMaxCardInputC1,
        fourMaxCardInputC2: req.body.fourMaxCardInputC2,
        fourMaxCardInputC3: req.body.fourMaxCardInputC3,
        fourMaxCardInputC4: req.body.fourMaxCardInputC4,
        fourMaxCardInputD1: req.body.fourMaxCardInputD1,
        fourMaxCardInputD2: req.body.fourMaxCardInputD2,
        fourMaxCardInputD3: req.body.fourMaxCardInputD3,
        fourMaxCardInputD4: req.body.fourMaxCardInputD4,
      },
      options = { upsert: true, new: true, setDefaultsOnInsert: true };
    savedDeck.findOneAndUpdate({}, data, options, function(error, data) {
      if (error) {
        console.log(error);
        console.log(req.body);
      } else {
        console.log(data);
        res.send(`Successfully posted ${data.fileName} deck to database.`);
        return console.log(
          `Successfully posted ${data.fileName} deck to database.`
        );
      }
    });
  });

  //GET/App Load Deck
  router.get('/loadDeck', function(req, res) {
    let data = {};
    savedDeck.find(`{userId: ${req.session.userId}}`, function(error, query) {
      if (error) console.log(error);
      else {
        console.log(query);
        res.send(JSON.stringify(query));
      }
    });
  });

  //GET/App Delete Deck
  router.get('/deleteDeck', function(req, res) {
    let data = req.body;
    savedDeck.findOneAndRemove(`{userId: ${data}}`, function(error, query) {
      if (error) console.log(error);
      else {
        console.log(query);
        res.send(JSON.stringify(query));
      }
    });
  });

  //GET/App
  router.get('/app', mid.requiresLogin, function(req, res, next) {
    User.findById(req.session.userId).exec(function(error, user) {
      if (error) {
        return next(error);
      } else {
        return res.render('app', {
          title: 'App',
          home: ' nav-link',
          app: ' nav-link active',
          about: ' nav-link',
          profile: ' nav-link',
          register: ' nav-link',
          login: ' nav-link',
        });
      }
    });
  });

  //GET/Login
  router.get('/login', function(req, res) {
    res.render('login.pug', {
      title: 'Login',
      home: ' nav-link',
      app: ' nav-link',
      about: ' nav-link',
      profile: ' nav-link',
      register: ' nav-link',
      login: ' nav-link active',
    });
  });

  //GET/Home
  router.get('/', function(req, res) {
    res.render('index.pug', {
      title: 'Home',
      home: ' nav-link active',
      app: ' nav-link',
      about: ' nav-link',
      profile: ' nav-link',
      register: ' nav-link',
      login: ' nav-link',
    });
  });

  //GET/Register
  router.get('/register', function(req, res) {
    res.render('register.pug', {
      title: 'Register',
      home: ' nav-link',
      app: ' nav-link',
      about: ' nav-link',
      profile: ' nav-link',
      register: ' nav-link active',
      login: ' nav-link',
    });
  });

  //GET/Profile
  router.get('/profile', mid.requiresLogin, function(req, res, next) {
    User.findById(req.session.userId).exec(function(error, user) {
      if (error) {
        return next(error);
      } else {
        console.log(req.session.userId);
        return res.render('profile', {
          title: 'Profile',
          firstName: user.firstName,
          lastName: user.lastName,
          home: ' nav-link',
          app: ' nav-link',
          about: ' nav-link',
          profile: ' nav-link active',
          register: ' nav-link',
          login: ' nav-link',
        });
      }
    });
  });

  module.exports = router;
}
router();
