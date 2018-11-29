const mongoose = require('mongoose');
const user = require('../models/user.js');
const codes = require('../models/code.js');
const bcrypt = require('bcrypt-nodejs')

module.exports.login = function(req, res) {
	user.findOne({email: req.body.email, password: req.body.password}).exec((err, user) => {
		if (user) {
			let userData = {
				email: user.email, 
				firstName: user.firstName,
				lastName: user.lastName,
				position: user.position
			}
			console.log(userData);
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

module.exports.createAccount = function(req, res) {
	//check credentials first, then create new account with appropriate position
	codes.find().exec((err, codes) => {
		if (err) {
			res.status(400).send({
				error: true,
				msg: "Error getting codes"
			})
		} else {
			let found = false; 
			let match = false; 
			for (let i = 0; i < codes.length; i++) {
				if (codes[i].kind == req.body.position) {
					found = true; 
					if (codes[i].authCode == req.body.positionCode) {
						match = true; 
					}
					break;
				}
			}
			//position code has been set and it matches
			if (found && match) {
				var hash = bcrypt.hashSync(req.body.password);
				console.log(hash); 
				let newUser = new user(req.body); 
				newUser.save(function (err) {
					if (err) {
						res.status(400).send({
							error: true,
							msg: "Error creating account Found && Match"
						})
					} else {
						res.status(200).send({
							msg: "Account Created",
							user: newUser
						})
					}
				})
			//position code has been set but does not match, return error
			} else if (found && !match) {
				res.status(400).send({
					error: true, 
					msg: "Code Doesn't Match"
				})
			//code is not set so check if they used the default code and if not return error
			} else if (!found) {
				if (req.body.positionCode == "goBroncos") {
					var hash = bcrypt.hashSync(req.body.password);
					console.log(hash); 
					let newUser = new user(req.body); 
					newUser.save(function (err) {
						if (err) {
							res.status(400).send({
								error: true,
								msg: "Error creating account !Found"
							})
						} else {
							res.status(200).send({
								msg: "Account Created",
								user: newUser
							})
						}
					})
				} else {
					res.status(400).send({
						error: true, 
						msg: "Code Doesn't Match"
					})
				}
			}
		}
	})
}

module.exports.updateCode = function(req, res) {
	if (req.body.kind  == "Tester") {
		codes.findOneAndUpdate({kind: "Tester"}, {$set: {authCode: req.body.authCode, kind: req.body.kind}}, {upsert: true}).exec((err, data) => {
			if (err) {
				res.status(400).send({
					error: true,
					msg: "Error updating tester code"
				})
			} else {
				res.status(200).send({
					data: data
				})
			}
		})
	} else if (req.body.kind == "Developer") {
		codes.findOneAndUpdate({type: "Developer"}, {$set: {authCode: req.body.authCode}}, {upsert: true}).exec((err, data) => {
			if (err) {
				res.status(400).send({
					error: true,
					msg: "Error updating tester code"
				})
			} else {
				res.status(200).send({
					data: data
				})
			}
		})
	} else if (req.body.kind == "Manager") {
		codes.findOneAndUpdate({type: "Manager"}, {$set: {authCode: req.body.authCode}}, {upsert: true}).exec((err, data) => {
			if (err) {
				res.status(400).send({
					error: true,
					msg: "Error updating tester code"
				})
			} else {
				res.status(200).send({
					data: data
				})
			}
		})
	}
}

module.exports.currentCodes = function(req, res) {
	codes.find().exec((err, data) => {
		if (err) {
			res.status(400).send({
				error: true,
				msg: "Error getting codes"
			})
		} else {
			res.status(200).send({
				data: data
			})
		}
	})
}





