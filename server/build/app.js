'use strict';

var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
require('dotenv').config();

// Set up the express app and middleware
var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.MY_SUPER_SECRET,
  cookie: { maxAge: 60000 }
}));

// Require our routes
require('./routes')(app);

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', function (req, res) {
  return res.status(200).send({
    message: 'Welcome to the beginning of nothingness.'
  });
});

module.exports = app;
//# sourceMappingURL=app.js.map