var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var codeSchema = new Schema({

	type: String,
	code: String

});

module.exports = mongoose.model('Code', codeSchema);