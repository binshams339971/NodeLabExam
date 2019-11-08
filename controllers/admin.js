var express = require('express');
var userModel = require('./../models/user-model');
var router = express.Router();

router.get('*', function(req, res, next){

	if(req.session.admin_username != null){
		next();
	}else{
		res.redirect('/login');
	}
});
router.get('/', function(req, res){
		res.render('admin/index');
});
router.get('/alluser', function(req, res){
	userModel.getAllUser(function(results){
		res.render('admin/alluser', {user: results});		
	});
});

router.get('/delete/:id', function(req, res){

	userModel.getById(req.params.id, function(results){
		res.render('admin/delete', {user: results});		
	});

});

router.post('/delete/:id', function(req, res){

		var id = req.params.id

	userModel.deleteUser(id, function(status){
		if(status){
			res.redirect('/admin/alluser');
		}else{
			res.redirect('/admin/alluser');
		}
	});
});

router.get('/add', function(req, res){
	res.render('admin/addmedicine');
});

router.post('/add', function(req, res){

	var medi = {
		name: req.body.name,
		price: req.body.price,
		count: req.body.count,
		genre: req.body.genre,
		type: req.body.type
		
	};
	userModel.insertMedicine(medi, function(status){
		if(status){
			res.redirect('/admin');
		}else{
			res.redirect('/admin/add');
		}
	});
});

router.get('/editmedi/:id', function(req, res){
	userModel.getMediByID(req.params.id, function(result){
		res.render('admin/editmedi', {medi: result[0]})
	});
});

router.post('/editmedi/:id', function(req, res){
	var medi = {
		name: req.body.name,
		price: req.body.price,
		count: req.body.count,
		genre: req.body.genre,
		type: req.body.type,
		id: req.params.id
	}
	console.log(medi);
	userModel.updateMedicine(medi, function(status){
		if(status){
			res.redirect('/admin/allmedicine');
		}else{
			res.send("Not upadred");
		}
	});
});
router.get('/allmedicine', function(req, res){
		userModel.getAllMedicine(function(results){
			res.render('admin/allmedicine', {medi: results});
		});		
});

router.get('/deletemedi/:id', function(req, res){
	userModel.deleteMedi(req.params.id, function(status){
		if(status){
			res.redirect('/admin/allmedicine');
		}else{
			res.send("Not deleted");
		}
		
	});
});
router.get('/allorder',function(req, res){
	userModel.getAllorder(function(results){
		console.log(results);
		res.render('admin/allorder',{order: results});
	});
});
router.get('/acceptorder/:id',function(req, res){
	userModel.getOrderById(req.params.id, function(result) {
		if(result.length > 0 ) {
			userModel.inertAccetorder(result, function(status){
				if(status){
					userModel.deleteOrderById(req.params.id, function(status){
						if(status){

						}else{
							
						}
					});
				}else{

				}
			});
		}else{
			callback([]);
		}
		
	});
});
router.get('/rejectorder/:id',function(req, res){
	userModel.insertRejectOrder(function(results){
		console.log(results);
		res.redirect('/allorder');
	});
});
router.get('/acceptorder',function(res, req){

});
router.get('/rejectorder',function(res, req){
	
});
module.exports = router;


