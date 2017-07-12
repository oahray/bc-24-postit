const usersController = require('../controllers').users;
const groupsController = require('../controllers').groups;
const authenticate = require('../middleware/authenticate');

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Postit API!' })
  );

  // User routes
  app.post('/api/user/signup', usersController.signup);
  app.post('/api/user/signin', usersController.signin);
  app.get('/api/user/me', authenticate, usersController.getMe);
  app.get('/api/user/me/groups', authenticate, usersController.getMyGroups);
  app.get('/api/user/me/messages', authenticate,
  usersController.getMySentMessages);
  app.delete('/api/user/logout', authenticate, usersController.logout);

  // Group routes
  app.post('/api/group', authenticate, groupsController.createGroup);

  app.post('/api/group/:groupid/user', authenticate,
  groupsController.addUserToGroup);

  app.get('/api/group/:groupid/users', authenticate,
  groupsController.getGroupUsers);

  app.post('/api/group/:groupid/message', authenticate,
  groupsController.sendMessageToGroup);

  app.get('/api/group/:groupid/messages', authenticate,
  groupsController.getGroupMessages);
};
