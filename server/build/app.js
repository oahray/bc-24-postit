'use strict';

var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

// Set up the express app
var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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