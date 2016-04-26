var router = require('express').Router();
var path = require('path');
var passport = require('passport');
var pg = require('pg');

var connectionString = 'postgres://localhost:5432/passport_stuff';

router.get('/', function(request, response){
  response.sendFile(path.join(__dirname, '../public/views/index.html'));
});

router.post('/', passport.authenticate('local', { successRedirect: '/success', failureRedirect: '/failure' }));

router.get('/success', function(request, response){
  response.sendFile(path.join(__dirname, '../public/views/success.html'));
});

router.get('/failure', function(request, response){
  response.sendFile(path.join(__dirname, '../public/views/failure.html'));
});

module.exports = router;
