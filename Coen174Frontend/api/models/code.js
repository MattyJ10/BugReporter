var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var codeSchema = new Schema({

	kind: String,
	authCode: String


});

module.exports = mongoose.model('Code', codeSchema);