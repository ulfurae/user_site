'use strict';

var express = require('express');
var router = express.Router();
var dbUtils = require('../utils/db-utils');

/* GET home page. */
router.get('/', function(req, res) {
  console.log(req.session);

	var queryStr = "SELECT username,wallpost,to_char(date, 'DD Month kl. HH24:MI') as date FROM userinfo order by userinfo.date desc";

  dbUtils.queryDb(queryStr,'', function(err,result) {
    if(err) {
      return console.error('error fetching wallposts', err);
    }
    var wallposts =  result.rows;

    if (wallposts) {
      
				console.log(wallposts);
				res.render('wall', {session : req.session, wallposts:wallposts, currentUrl:'/wall' });
    }
  });


  
});


module.exports = router;
