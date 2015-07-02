// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var settings = require('./config');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

// configure app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(allowCrossDomain);

var port     = process.env.PORT || 9090; // set our port

var mongoose   = require('mongoose');
mongoose.connect(settings.db); // connect to our database

//require in mongoose models
//var Poll     = require('./app/models/poll');

// ROUTES FOR OUR API
// =============================================================================


// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET /api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});


app.use('/api', router);

server.listen(port);
console.log('Magic happens on port ' + port);
