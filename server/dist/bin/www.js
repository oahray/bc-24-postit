'use strict';

var http = require('http');
var app = require('../app');
var models = require('../models');

// models.sequelize.sync();

var port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

var server = http.createServer(app);
server.listen(port, function () {
  return console.log('Express server listening on port ' + port);
});