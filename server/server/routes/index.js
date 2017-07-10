const usersController = require('../controllers').users;
const groupsController = require('../controllers').groups;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({ message: 'Welcome to the Postit API!' })
  );

  // User routes
  app.post('/api/user/signup', usersController.signup);
  app.post('/api/user/signin', usersController.signin);

  // Group routes
  app.post('/api/group', groupsController.createGroup);
};
