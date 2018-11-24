const mongoose = require('mongoose');
const user = require('../models/user.js');

module.exports.login = function(req, res) {
	user.findOne({email: req.body.email, password: req.body.password}).exec((err, user) => {
		if (user) {
			let userData = {
				email: user.email, 
				firstName: user.firstName,
				lastName: user.lastName,
				position: user.position
			}
			res.status(200).send({
				data: userData
			})
		} else {
			res.status(400).send({
				error: true,
				msg: "Error Logging in user, account doesn't exist"
			})
		}
	})
} 