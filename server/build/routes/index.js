'use strict';

var usersController = require('../controllers').users;
var groupsController = require('../controllers').groups;

module.exports = function (app) {
  app.get('/api', function (req, res) {
    return res.status(200).send({ message: 'Welcome to the Postit API!' });
  });

  // User routes
  app.post('/api/user/signup', usersController.signup);
  app.post('/api/user/signin', usersController.signin);

  // Group routes
  app.post('/api/group', groupsController.createGroup);
};
//# sourceMappingURL=index.js.map