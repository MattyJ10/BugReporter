const express = require('express');
const bugController = require('../controllers/bugController.js'); 
const authController = require('../controllers/authController.js'); 


module.exports = function(app, express) {
	let router = express.Router();

	app.post('/api/savebug', bugController.saveBug);
	app.get('/api/getBugs', bugController.getBugs); 
	app.post('/api/updateBug', bugController.updateBug);
	app.post('/api/login', authController.login);  
	app.post('/api/createAccount', authController.createAccount); 
	app.post('/api/updateCode', authController.updateCode); 
	app.get('/api/currentCodes', authController.currentCodes); 
	
}