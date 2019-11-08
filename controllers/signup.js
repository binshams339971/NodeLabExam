var express = require('express');
var userModel = require('./../models/user-model');

var router = express.Router();

router.get('/', function(req, res){
	res.render('signup/index');
});

router.post('/', function(req, res){
	
	var user = {
		name: req.body.name,
		username: req.body.username,
		password: req.body.password,
		type: req.body.type
	}
	userModel.validateUserName(req.body.username, function(result){
		if(result.length > 0){
			res.send("This username is already exist.");
		}else{
			userModel.insertUser(user, function(status){
				if(status){
					res.redirect('/login');	
				}else{
					res.redirect('/signup');
				}
			});
		}
	});

});

module.exports = router;


