import * as usersController from '../controllers/users';
import * as groupsController from '../controllers/groups';
import authenticate from '../middleware/authenticate';
import isGroupMember from '../middleware/isGroupMember';
import isValidUsername from '../middleware/isValidUsername';
import isTaken from '../middleware/isTaken';

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Postit API!' })
  );

  // User routes
  app.post('/api/user/signup', isValidUsername, isTaken,
   usersController.signup);

  app.post('/api/user/signin', isValidUsername,
    usersController.signin);

  app.get('/api/user/me', authenticate, usersController.getMe);

  app.get('/api/user/me/groups', authenticate, usersController.getMyGroups);

  app.get('/api/user/me/messages', authenticate,
  usersController.getMySentMessages);

  app.delete('/api/user/logout', authenticate, usersController.logout);

  // Group routes
  app.post('/api/group', authenticate, groupsController.createGroup);

  app.post('/api/group/:groupid/user', authenticate, isValidUsername,
  isGroupMember, groupsController.addUserToGroup);

  app.get('/api/group/:groupid/users', authenticate,
  isGroupMember, groupsController.getGroupUsers);

  app.post('/api/group/:groupid/message', authenticate,
  isGroupMember, groupsController.sendMessageToGroup);

  app.get('/api/group/:groupid/messages', authenticate,
  isGroupMember, groupsController.getGroupMessages);
};
