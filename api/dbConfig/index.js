const api = require('express'),
  router = api.Router(),
  User = require('./model/users'),
  database = require('mongoose'),
  dbName = 'home',
  dbPort = 27017;

database.connect(`mongodb://localhost:${dbPort}/${dbName}`, () =>
  console.log(`The database has initiated on port ${dbPort}`)
);

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