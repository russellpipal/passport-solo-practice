var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var pg = require('pg');
var encryptLib = require('../../modules/encryptLib');

var connectionString = 'postgres://localhost:5432/passport_stuff';

router.get('/', function(request, response){
  response.sendFile(path.join(__dirname, '../public/views/register.html'));
});

router.post('/', function(request, response){
  pg.connect(connectionString, function(err, client){
    var query = client.query('INSERT INTO users (username, password) VALUES ($1, $2)', 
    [request.body.username, encryptLib.encryptPassword(request.body.password)]);

    query.on('error', function(err){
      console.log(err);
      response.sendStatus(500);
    });

    query.on('end', function(){
      response.sendStatus(200);
      client.end();
    });
  });
});

module.exports = router;
