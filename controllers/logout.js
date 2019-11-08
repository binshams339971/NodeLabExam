var express = require('express');
var router = express.Router();

router.get('/', function(req, res){

	req.session.user_username = null;
	req.session.admin_username = null;
	res.redirect('/login');
});

module.exports = router;


