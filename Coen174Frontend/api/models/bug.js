var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var bugSchema = new Schema({

	email: String,
	name: String,
	software: String,
	before: String,
	description: String,
	dateReported: {
		type: Date,
		default: new Date()
	},
	status: {
		type: String,
		default: "Submitted"
	},
	currentWorker: {
		type: String,
		default: "None"
	}

});

module.exports = mongoose.model('Bug', bugSchema);