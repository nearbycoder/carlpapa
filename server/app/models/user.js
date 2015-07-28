
//EXAMPLE
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({	
	email: String,
	password: String,
	ingredients: Schema.Types.Mixed,
	instructions: Schema.Types.Mixed,	
});

module.exports = mongoose.model('User', UserSchema);