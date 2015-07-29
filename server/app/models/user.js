
//EXAMPLE
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({	
	email: String,
	password: String,
	recipes: Schema.Types.Mixed,
});

module.exports = mongoose.model('User', UserSchema);