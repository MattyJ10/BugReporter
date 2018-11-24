const mongoose = require('mongoose');
const user = require('../models/bug.js'); 

module.exports.getAllDevs = function(req, res) {
	user.find({position: "developer"}).exec((err, devs) => {
		if (err) {
			res.status(400).send({
				error: true,
				msg: "Could not get devs"
			})
		} else {
			user.find({position: "tester"}).exec((error, testers) => {
				if (error) {
					res.status(400).send({
						error: true,
						msg: "Could not get testers"
					})
				} else {
					res.status(200).send({
						devs: devs,
						testers: testers
					})
				}
			})
		}
	})
}