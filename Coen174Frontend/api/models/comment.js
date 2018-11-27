var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var commentSchema = new Schema({

	bugId: {
		type: Schema.Types.ObjectId,
		ref: 'Bug'
	},
	dateAdded: {
		type: Date,
		default: new Date()
	},
	comment: String


});

module.exports = mongoose.model('Comment', commentSchema);