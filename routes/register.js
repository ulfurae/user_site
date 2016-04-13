'use strict';

var express = require('express');
var router = express.Router();
var xss = require('node-xss').clean;
var hash = require('password-hash');
var dbUtils = require('../utils/db-utils');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('register');
});

/* GET home page. */
router.post('/', function(req, res) {

  var hPassword = hash.generate(xss(req.body.password));
	
  var parameters = [xss(req.body.name), xss(req.body.username), hPassword];

  var queryStr = "INSERT INTO users (name, username, password) VALUES ($1,$2,$3)";
  dbUtils.queryDb(queryStr, parameters, function(err) {
    if(err)
      return console.error('error saving new user', err);
    
    res.render('register', {msg: 'Þú hefur stofnað aðgang að Minifacebook! Farðu á forsíðuna og skráðu þig inn.'});
  });
});


module.exports = router;
