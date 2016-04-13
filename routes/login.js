'use strict';

var express = require('express');
var router = express.Router();
var xss = require('node-xss').clean;
var hash = require('password-hash');
var dbUtils = require('../utils/db-utils');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('login', { title: 'Minifacebook-login' });
});

/* GET home page. */
router.post('/', function(req, res) {
  //ÞETTA VELDUR SQL INJECTION!!! t.d ' OR '1' = '1
  // var queryStr = "SELECT * from users WHERE username = '"+req.body.username+
  //                "' AND password = '"+ req.body.password+"'";
  // var parameters = null;

  var queryStr = "SELECT * FROM users WHERE username = $1";
  var parameters = [xss(req.body.username)];

  dbUtils.queryDb(queryStr, parameters, function(err,result) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    var user =  result.rows[0];
		var passwordMatch = hash.verify(xss(req.body.password), user.password);

    if (user && passwordMatch) {
      // Regenerate session when signing in
      // to prevent fixation
      req.session.regenerate(function() {
        // Store the user's primary key
        // in the session store to be retrieved,
        // or in this case the entire user object
        req.session.user = user;
				res.redirect('/wall');
      });
    } else res.render('login', { title: 'Minifacebook-login', alert: 'notendanafn eða lykorð vitlaust' });
  });



});


module.exports = router;
