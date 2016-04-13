'use strict';

var express = require('express');
var router = express.Router();
var xss = require('node-xss').clean;
var dbUtils = require('../utils/db-utils');


/* GET home page. */
router.post('/', function(req, res) {

	var cleanPost = xss(req.body.content);
  var parameters = [req.body.user, cleanPost];

  var queryStr = "INSERT INTO userInfo (username, wallpost, date) VALUES ($1, $2, now())";
	
  dbUtils.queryDb(queryStr, parameters, function(err) {
    if(err)
    	return console.error('error writing wallpost', err);
    else
			console.log('wallpost saved');

    res.redirect('/wall');
  });
});


module.exports = router;
