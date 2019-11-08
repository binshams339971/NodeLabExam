var express = require('express');
var userModel = require('./../models/user-model');
var router = express.Router();

/* router.get('*', function(req, res, next){

	if(req.session.user_username != null){
		next();
	}else{
		res.redirect('/login');
	}
}); */
router.get('/', function(req, res){
		var username = req.session.user_username;
		if(req.session.user_username != null){
			userModel.getByUsername(username, function(result){
				if(result.length>0){
					res.render('user/index', {user: result[0]});
				}else{
					
				}
			});
		}else{
			res.render('/login');
		}
}); 

router.post('/', function(req, res){
	var user = {
		id: req.body.id,
		name: req.body.name,
		username: req.body.username,
		password: req.body.password,
		type: req.body.type
	}
	userModel.updateUser(user, function(status){
		if(status){
			res.send("Updated");
		}else{
			res.send("Not Updated");
		}
	});
});
router.get('/myorder', function(req, res){
	userModel.getMyOrder(req.session.user_username, function(results){
		res.render('user/myorder',{order: results});
	});
});
module.exports = router;

