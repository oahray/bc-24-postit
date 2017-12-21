import * as usersController from '../controllers/users';
import * as groupsController from '../controllers/groups';
import authenticate from '../middleware/authenticate';
import isGroupMember from '../middleware/isGroupMember';
import isValidUsername from '../middleware/isValidUsername';
import isValidEmail from '../middleware/isValidEmail';
import isTaken from '../middleware/isTaken';

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Postit API!',
  }));

  // User routes
  app.post('/api/v1/user/signup', isValidUsername,
  isValidEmail, isTaken, usersController.signup);

  app.post('/api/v1/user/signin',
    usersController.signin);

  app.get('/api/v1/user/me', authenticate, usersController.getMe);

  app.get('/api/v1/user/all', authenticate, usersController.getAllUsers);

  app.get('/api/v1/user/me/groups', authenticate, usersController.getMyGroups);

  app.get('/api/v1/user/me/messages', authenticate,
  usersController.getMySentMessages);

  app.patch('/api/v1/user/me/password', authenticate,
  usersController.changePassword);

  app.patch('/api/v1/user/me/edit', authenticate, usersController.editProfile);

  // Group routes
  app.post('/api/v1/group', authenticate, groupsController.create);

  app.route('/api/v1/group/:groupid/user')
    .post(authenticate, isValidUsername,
    isGroupMember, groupsController.addUser)
    .delete(authenticate, isValidUsername,
  isGroupMember, groupsController.removeUser);

  app.post('/api/v1/group/:groupid/leave', authenticate,
  isGroupMember, groupsController.leave);

  app.get('/api/v1/group/:groupid/users', authenticate,
  isGroupMember, groupsController.getUsers);

  app.post('/api/v1/group/:groupid/message', authenticate,
  isGroupMember, groupsController.sendMessage);

  app.get('/api/v1/group/:groupid/messages', authenticate,
  isGroupMember, groupsController.getMessages);

  app.post('/api/v1/group/:groupid/message/:messageid/read', authenticate,
  isGroupMember, groupsController.markRead);

  app.patch('/api/v1/group/:groupid/info', authenticate,
  isGroupMember, groupsController.editInfo);

  app.post('/api/v1/group/:groupid/remove', authenticate,
  isGroupMember, groupsController.deleteGroup);

  // Recovery routes
  app.post('/api/v1/forgotpassword', usersController.forgotPassword);
  app.post('/api/v1/resetpassword', usersController.resetPassword);
};
