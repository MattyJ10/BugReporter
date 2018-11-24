const mongoose = require('mongoose');
const user = require('../models/bug.js'); 

module.exports.getAllDevs = function(req, res) {
	user.find({}).exec((err, devs) => {
		if (err) {
			res.status(400).send({
				error: true,
				msg: "Could not get devs"
			})
		} else {
			res.status(200).send({
				data: devs
			})
		}
	})
}