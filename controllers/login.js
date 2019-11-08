var express = require('express');
var userModel = require('./../models/user-model');

var router = express.Router();

router.get('/', function(req, res){
	res.render('login/index');
});

router.post('/', function(req, res){
	
	var user = {
		username: req.body.username,
		password: req.body.password
	}

	userModel.validateUser(user, function(result){
		if(result[0].type == 'Admin'){
			req.session.admin_username = result[0].username;
			res.redirect('/admin');
		}else if(result[0].type == 'User'){
			req.session.user_username = result[0].username;
			res.redirect('/user');
		}else{
			res.send("Invalid username or password");
		}
	});
});

module.exports = router;


