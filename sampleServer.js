/*eslint no-undef: "error"*/
/*eslint-env node*/
/*eslint no-console: 0*/
function server() {
	'use strict';
	var mongoose = require('mongoose'),
		bodyParser = require('body-parser'),
		express = require('express'),
		session = require('express-session'),
		MongoStore = require('connect-mongo')(session),
		path = require('path'),
		//mongodb connection
		db = mongoose.connection,
		app = express(),
		port = 5000;

	//establish view rendering engine
	app.set('view engine', 'pug');
	app.set('views', path.join(__dirname, '/src/templates'));

	// parse incoming requests
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));

	// use sessions for tracking logins
	app.use(
		session({
			secret: 'Atem is watching...',
			resave: true,
			saveUninitialized: false,
			store: new MongoStore({
				mongooseConnection: db,
			}),
		})
	);

	//make user ID available in templates
	app.use(function(req, res, next) {
		res.locals.currentUser = req.session.userId;
		next();
	});

	//establish router
	var routes = require('./routes/index');
	app.use('/', routes);

	//mongodb connection
	mongoose.connect('mongodb://localhost:27017/kcdb');

	//mongo error
	db.on('error', console.error.bind(console, 'connection error'));

	//serve static files
	app.use('/static', express.static(path.join(__dirname, 'public')));
	app.use('/static', express.static(path.join(__dirname, 'public/js/')));
	app.use('/static', express.static(path.join(__dirname, 'public/css/')));
	app.use(
		'/static',
		express.static(path.join(__dirname, 'node_modules/jstat/dist'))
	);
	app.use(
		'/static',
		express.static(
			path.join(__dirname, 'node_modules/javascript-lp-solver/src')
		)
	);

	// server listening
	app.listen(port, function() {
		console.log(`The frontend server is running on port ${port}.`);
	});
}
server();
