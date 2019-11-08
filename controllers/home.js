var express = require('express');
var userModel = require('./../models/user-model');
var router = express.Router();


router.get('/', function(req, res){
	userModel.getAllMedicine(function(results){
		res.render('home/index', {medi: results});
	})
});

router.post('/', function(req, res){
	var s = req.body.search;
});

router.get('/buy/:id', function(req, res){
	userModel.getMediByID(req.params.id, function(results){
		res.render('home/buy', {medi: results[0]});		
	});
});

router.post('/buy/:id', function(req, res){
		var medi1 = {
			id: req.params.id,
			name: req.body.name,
			totalprice: req.body.price * req.body.quantity,
			genre: req.body.genre,
			type: req.body.type
		};	
		req.session.medi =  {
			id: req.params.id,
			name: req.body.name,
			totalprice: req.body.price * req.body.quantity,
			genre: req.body.genre,
			type: req.body.type
		};	
	res.redirect('/home/order');
});

router.get('/order', function(req, res){
	console.log(req.session.medi);
	res.render('home/order', {medi: req.session.medi});
});
router.post('/order', function(req, res){
	if(req.session.user_username != null){
		var order1 = {
			id: req.body.id,
			name: req.body.name,
			totalprice: req.body.totalprice,
			genre: req.body.genre,
			type: req.body.type,
			address: req.body.address,
			area: req.body.area,
			phonenumber: req.body.phonenumber,
			username: req.session.user_username
		}
		userModel.insertOrder(order1, function(status){
			if(status){
				res.send("Ordered");
			}else{
				res.send("Not Ordered");
			}
		});
	}else{
		res.send("Have to login first");
	}
});
/* router.post('/buy/:id', function(req, res){
	if(req.session.email == null){
		res.send("Please login first");
	}else{
		//console.log(req.session.email);
		var id = req.params.id;
		var book = {
			id: req.params.id,
			bname: req.body.bname,
			aname: req.body.aname,
			category: req.body.category,
			price: req.body.total,
			semail: req.body.semail,
			bemail: req.session.email
		};
		bookModel.insertOrder(book, function(status){
			if(status){
				console.log(id);
				bookModel.deleteOrderedBook(id, function(status1){
					if(status1){
						res.redirect('/user');
					}else{
						res.send("Not Ordered");
					}
				});
			}else{
				res.send("Not Ordered");
			}
		});
	}
}); */



/* bookModel.insertOrder(book, function(status){
	if(status){
		
	}else{
		res.send("Not Ordered");
	}
});
bookModel.deleteOrderedBook(id, function(status1){
			
	if(status1){
		res.send("Ordered");
		//res.redirect('/user');
	}else{
		res.send("Not Ordered");
	}
}); */


module.exports = router;


