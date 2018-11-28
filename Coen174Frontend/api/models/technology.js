var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var techSchema = new Schema({

	name: String

});

module.exports = mongoose.model('Technology', techSchema);