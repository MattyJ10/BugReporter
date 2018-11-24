const mongoose = require('mongoose');
const user = require('../models/bug.js'); 

module.exports.getAllDevs = function(req, res) {
	user.find({ $or: [{position: "developer"}, {position: "tester"}]}).exec((err, data) => {
		if (err) {
			res.status(400).send({
				error: true,
				msg: "Could not get devs"
			})
		} else {
			console.log(data);
			res.status(200).send({
				data: data
			})
		}
	})
}