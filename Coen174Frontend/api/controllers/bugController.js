const mongoose = require('mongoose');
const Bug = require('../models/bug.js'); 


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