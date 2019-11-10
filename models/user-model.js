var db = require('./db');

module.exports={

	getById: function(id, callback){
		var sql = "select * from user where id=?";
		db.getResults(sql, [id], function(result){

			//console.log(result);
			if(result.length > 0 ){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},
	getSearch : function(key, callback){
		var sql = "select * from medicine where name=? or genre=? or type=?";
		db.getResults(sql, [key, key, key], function(result){
			if(result.length > 0 ){
				callback(result);
			}else{
				callback([]);
			}
		});
	},
	validateUser: function(user, callback){
		var sql = "select * from user where username=? and password=?";

		db.getResults(sql, [user.username, user.password], function(result){

			if(result.length > 0 ) {
				callback(result);
			}else{
				callback(false);
			}
		});
	},
	validateUserName : function(username, callback){
		var sql = "select * from user where username=?";

		db.getResults(sql, [username], function(result){

			if(result.length > 0 ) {
				callback(result);
			}else{
				callback([]);
			}
		});
	},
	getAllUser : function(callback){
		var sql = "select * from user where type = 'User'";
		db.getResults(sql, [], function(results){
			if(results.length > 0 ) {
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	getAllMedicine : function(callback){
		var sql = "select * from medicine";
		db.getResults(sql, [], function(results){
			if(results.length > 0 ) {
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	getMediByID : function(id, callback){
		var sql = "select * from medicine where id=?";
		db.getResults(sql, [id], function(results){
			if(results.length > 0 ) {
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	getByUsername : function(username, callback){
		var sql = "select * from user where username=?";
		db.getResults(sql, [username], function(results){
			if(results.length > 0 ) {
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	getMyOrder: function(username, callback){
		var sql = "select * from mediorder where username=?";
		db.getResults(sql, [username], function(results){
			if(results.length > 0 ) {
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	getAllorder : function(callback){
		var sql = "select * from mediorder";
		db.getResults(sql, [], function(results){
			if(results.length > 0 ) {
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	getOrderById : function(id, callback){
		var sql = "select * from mediorder where id=?";
		db.getResults(sql, [id], function(results){
			if(results.length > 0 ) {
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	getAllAcceptOrder : function(callback){
		var sql = "select * from acceptmediorder";
		db.getResults(sql, [], function(results){
			if(results.length > 0 ) {
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	getAllRejectOrder : function(callback){
		var sql = "select * from rejectmediorder";
		db.getResults(sql, [], function(results){
			if(results.length > 0 ) {
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	insertUser : function(user, callback){
		var sql = "insert into user values('', ?, ?, ?, ?)";
		db.execute(sql, [user.name, user.username, user.password, user.type], function(status){
			callback(status);
		});
	},
	insertMedicine : function(medi, callback){
		var sql = "insert into medicine values('', ?, ?, ?, ?,?)";
		db.execute(sql, [medi.name, medi.price, medi.count, medi.genre, medi.type], function(status){
			callback(status);
		});
	},
	insertOrder :  function(order, callback){
		var sql = "insert into mediorder values('', ?, ?, ?, ?, ?, ?, ?, ?,?)";
		db.execute(sql, [order.id, order.name, order.totalprice, order.genre, order.type, order.address, order.area, order.phonenumber, order.username], function(status){
			callback(status);
		});
	},
	inertAccetorder : function(order, callback){
		var sql = "insert into acceptmediorder values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
		db.execute(sql, [order.id, order.mid, order.name, order.totalprice, order.genre, order.type, order.address, order.area, order.phonenumber, order.username], function(status){
			callback(status);
		});
	},
	insertRejectOrder : function(order, callback){
		var sql = "insert into rejectmediorder values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
		db.execute(sql, [order.id, order.mid, order.name, order.totalprice, order.genre, order.type, order.address, order.area, order.phonenumber, order.username], function(status){
			callback(status);
		});
	},
	update : function(user, callback){
		var sql = "update user set name=?, phone=?, password=?, location=? where email=?";		
			db.execute(sql, [user.name, user.phone, user.password, user.location, user.email], function(status){
				callback(status);
			});	
	}, 
	updateUser : function(user, callback){
		var sql = "update user set name=?, username=?, password=?, type=?, where id=?";		
		db.execute(sql, [user.name, user.username, user.password, user.type, user.id], function(status){
			callback(status);
		});	
	}, 
	updateMedicine : function(medi, callback){
		var sql = "update medicine set name=?, price=?, count=?, genre=?, type=? where id=?";		
			db.execute(sql, [medi.name, medi.price, medi.count, medi.genre, medi.type, medi.id], function(status){
				callback(status);
			});	
	}, 
	deleteUser : function(id, callback){
		var sql = "DELETE FROM `user` WHERE id=?";
		db.execute(sql, [id],  function(status){
			callback(status);
		});
	},
	deleteMedi : function(id, callback){
		var sql = "DELETE FROM `medicine` WHERE id=?";
		db.execute(sql, [id],  function(status){
			callback(status);
		});
	},
	deleteOrderById : function(id, callback){
		var sql = "DELETE FROM mediorder WHERE id=?";
		db.execute(sql, [id],  function(status){
			callback(status);
		});
	},
}	


