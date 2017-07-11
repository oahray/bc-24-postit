const usersController = require('../controllers').users;
const groupsController = require('../controllers').groups;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Postit API!' })
  );

  // User routes
  app.post('/api/user/signup', usersController.signup);
  app.post('/api/user/signin', usersController.signin);
  app.get('/api/user/me', usersController.getMe);
  app.get('/api/user/me/groups', usersController.getMyGroups);
  app.delete('api/users/me/token', usersController.logout);

  // Group routes
  app.post('/api/group', groupsController.createGroup);
  app.post('/api/group/:groupid/user', groupsController.addUserToGroup);
  app.get('/api/group/:groupid/users', groupsController.getGroupUsers);
  app.post('/api/group/:groupid/message', groupsController.addMessageToGroup);
  app.get('/api/group/:groupid/messages', groupsController.getGroupMessages);
};
