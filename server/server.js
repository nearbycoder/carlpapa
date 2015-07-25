// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').createServer(app);
var jwt = require('jsonwebtoken');
var settings = require('./config');
var morgan = require('morgan');

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
app.use(morgan('dev'));

var port = process.env.PORT || 9090; // set our port

var mongoose = require('mongoose');
mongoose.connect(settings.db); // connect to our database

app.set('superSecret', settings.secret);

//require in mongoose models
var User = require('./app/models/user');

// ROUTES FOR OUR API
// =============================================================================

// test route to make sure everything is working (accessed at GET /api)
app.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to carl papa\'s api' });	
});

app.post('/createAccount', function(req, res){
	
		var user = new User();
		user.email = req.body.email;
		user.password = req.body.password;
		user.ingredients = [];
		user.instructions = {};

		user.save(function(err, user){
			if(err) throw err;

		console.log('User Created Successfully');
		res.json({success: true});

		});
});

// create our router
var apiRoutes = express.Router();

apiRoutes.post('/authenticate', function(req,res){
		// find the user
		  User.findOne({
		    email: req.body.email
		  }, function(err, user) {

		    if (err) throw err;

		    if (!user) {
		      res.json({ success: false, message: 'Authentication failed. Email or Password not correct.' });
		    } else if (user) {

		      // check if password matches
		      if (user.password != req.body.password) {
		        res.json({ success: false, message: 'Authentication failed. Email or Password not correct.' });
		      } else {

		        // if user is found and password is right
		        // create a token
		        var token = jwt.sign(user, app.get('superSecret'), {
		          expiresInMinutes: 1440 // expires in 24 hours
		        });

		        // return the information including token as JSON
		        res.json({
		          success: true,
		          message: 'Enjoy your token!',
		          token: token
		        });
		      }   

		    }

		  });
});
	
//middleware for checking JWT

apiRoutes.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});


//

apiRoutes.route('/recipe')

	.post(function(req, res){
		

		res.json([{ response: 'Recipe Created'}, {recipe: recipe}]);

	})

	//get all recipes for specific users
	.get(function(req, res){
		User.find({}, function(err, users){
			res.json(users);
		});
	});


apiRoutes.route('/recipe/:_id')
	
	.get(function(req, res) {
		//get single recipe for specific user
	})

	.put(function(req, res){
		//update a single recipe

	})

	.delete(function(req, res){
		//remove a single recipe
	});

app.use('/api', apiRoutes);

server.listen(port);
console.log('Carl Papa happens on port ' + port);
