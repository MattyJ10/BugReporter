const mongoose = require('mongoose');
const tech = require('../models/technology.js'); 

module.exports.getExtraTechnologies = function(req, res) {
	tech.find({}).exec((err, techs) => {
		if (err) {
			res.status(400).send({
				error: true, 
				msg: "Could not get technologies"
			})
		} else {
			res.status(200).send({
				error: false, 
				techs: techs
			})
		}
	})
}