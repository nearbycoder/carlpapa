
//EXAMPLE
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RecipeSchema   = new Schema({	
	name: String,
	ingredients: Schema.Types.Mixed,
	instructions: Schema.Types.Mixed,	
});

module.exports = mongoose.model('Recipe', RecipeSchema);

