const mongoose = require('mongoose');
const comment = require('../models/comment.js'); 

module.exports.addComment = function(req, res) {
	let bugId = req.body.bugId; 
	let comment = req.body.comment; 
	let newComment = new comment(req.body); 
	newComment.save(err => {
		if (err) {
			res.status(400).send({
				error: true
			});
		} else {
			res.status(200).send({
				error: false
			});
		}
	})
}

module.exports.getComments = function(req, res) {
	comment.find({_id: req.params.id}).exec((err, comments) => {
		if (err) {
			res.status(400).send({
				error: true,
				msg: "Could not get comments"
			})
		} else {
			res.status(200).send({
				error: false,
				comments: comments
			})
		}
	})
}