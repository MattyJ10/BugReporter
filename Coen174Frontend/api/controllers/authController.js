const mongoose = require('mongoose');
const user = require('../models/user.js');
const codes = require('../models/code.js');

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

	let newUser = new user(req.body); 
	console.log(newUser); 
	newUser.save(function (err) {
		if (err) {
			res.status(400).send({
				error: true,
				msg: "Error creating account"
			})
		} else {
			res.status(200).send({
				msg: "Account Created",
				user: newUser
			})
		}
	})
	
}

module.exports.updateCode = function(req, res) {
	if (req.body.kind  == "Tester") {
		codes.findOneAndUpdate({type: "tester"}, {$set: {authCode: req.body.authCode}}, {upsert: true}).exec((err, data) => {
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





