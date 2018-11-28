const mongoose = require('mongoose');
const Bug = require('../models/bug.js'); 
const comment = require('../models/comment.js'); 


module.exports.saveBug = function(req, res) {
	console.log(req.body); 

	let newBug = new Bug(req.body);
	newBug.save(err => {
		if (err) {
			res.status(400).send({
				error: true
			});
		} else {
			res.status(200).send({
				error: false
			});
		}
	});
}

module.exports.getBugs = function(req, res) {
	Bug.find({}).sort('-dateReported').exec((err, data) => {
		if (err) {
			res.status(400).send({
				error: true
			})
		} else {
			res.status(200).send({
				error: false,
				data: data
			})
		}
	})
}

module.exports.updateBug = function(req, res) {
	Bug.update({dateReported: req.body.dateReported, email: req.body.email, name: req.body.name}, req.body).exec((err, data) => {
		if (err) {
			res.status(400).send({
				error: true
			})
		} else {
			res.status(200).send({
				error: false
			})
		}
	})
}

module.exports.getAssignedBugs = function(req, res) {
	Bug.find({currentWorker: req.params.email}).sort('-dateReported').exec((err, bugs) => {
		if (err) {
			res.status(400).send({
				error: true
			})
		} else {
			res.status(200).send({
				error: false,
				bugs: bugs
			})
		}
	})
}

module.exports.getSubmittedBugs = function(req, res) {
	Bug.find({email: req.params.email}).sort('-dateReported').exec((err, bugs) => {
		if (err) {
			res.status(400).send({
				error: true
			})
		} else {
			res.status(200).send({
				error: false,
				bugs: bugs
			})
		}
	})
}

module.exports.deleteBug = function(req, res) {
	Bug.deleteOne({_id: req.body.bug._id}).exec((err, data) => {
		if (err) {
			res.status(400).send({
				error: true
			})
		} else {
			comment.deleteMany({bugId: req.body.bug._id}).exec((err, data) => {
				if (err) {
					res.status(400).send({
						error: true
					})
				} else {
					res.status(200).send({
						error: false
					})
				}
			})
		}
	})
}

module.exports.getFilteredBugs = function(req, res) {
	Bug.find({req.body}).exec((err, bugs) => {
		if (err) {
			res.status(400).send({
				error: true
			})
		} else {
			res.status(200).send({
				error: false,
				bugs: bugs
			})
		}
	})
}

