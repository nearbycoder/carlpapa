// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var server = require('http').createServer(app);
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
var Recipe     = require('./app/models/recipe');

// ROUTES FOR OUR API
// =============================================================================


// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function (req, res, next) {
	// do logging
	next();
});

// test route to make sure everything is working (accessed at GET /api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to carl papa\'s api' });	

});

router.get('/carlpapa', function (req, res) {
	res.json({ message: 'Hey carlpapa' });	
});

router.route('/recipe')

	.post(function(req, res){
		var recipe = new Recipe();
		recipe.name = req.body.name;
		recipe.ingredients = req.body.ingredients;
		recipe.instructions = req.body.instructions;

		recipe.save(function(err, recipe){
			if(err)
				res.send(err);

		res.json([{ response: 'Recipe Created'}, {recipe: recipe}]);

		});



	})
	//Get all recipes
	.get(function(req, res){
		Recipe.find(function (err, recipe){
			if(err)
				res.send(err);

			res.json(recipe);
		});
	});

//
router.route('/recipe/:_id')
	
	.get(function(req, res) {
		Recipe.findOne({_id :req.params._id}, function(err, recipe) {
			if (err)
				res.send(err);
				
			res.json(recipe);
		});
	})

	.put(function(req, res){

		Recipe.findOneAndUpdate({_id:req.params._id}, req.body, function(err, recipe){
			res.send(recipe);

		});
		

	})

	.delete(function(req, res){
		Recipe.findOneAndRemove({_id:req.params._id}, function(err, recipe){
			res.json({ response: 'Recipe Deleted'});
		});
	});

app.use('/api', router);

server.listen(port);
console.log('Carl Papa happens on port ' + port);
