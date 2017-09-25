import * as usersController from '../controllers/users';
import * as groupsController from '../controllers/groups';
import authenticate from '../middleware/authenticate';
import isGroupMember from '../middleware/isGroupMember';
import isValidUsername from '../middleware/isValidUsername';
import isTaken from '../middleware/isTaken';

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Postit API!',
    info: 'This is a list of available end points',
    signup: 'POST /api/user/signup',
    signin: 'POST /api/user.signin',
    getMe: 'GET /api/user/me',
    myGroups: '/api/user/me/groups',
    myMessages: '/api/user/me/messages',
    logout: 'POST /api/user/logout',
    createGroup: '/api/group',
    addUserToGroup: '/api/group/:groupid/user',
    groupUsers: '/api/group/:groupid/users',
    sendMessage: '/api/group/:groupid/message',
    getMessages: '/api/group/:groupid/messages'
  }));

  // User routes
  app.post('/api/user/signup', isValidUsername, isTaken,
   usersController.signup);

  app.post('/api/user/signin', isValidUsername,
    usersController.signin);

  app.get('/api/user/me', authenticate, usersController.getMe);

  // app.get('/api/user/token', authenticate, usersController.refreshToken);

  app.get('/api/user/all', authenticate, usersController.getAllUsers);

  app.get('/api/user/me/groups', authenticate, usersController.getMyGroups);

  app.get('/api/user/me/messages', authenticate,
  usersController.getMySentMessages);

  app.patch('/api/user/me/password', authenticate,
  usersController.changePassword);

  // app.patch('/api/user/me/email', authenticate, usersController.changeEmail);

  // app.post('/api/user/deactivate', authenticate, isValidUsername,
  // usersController.deactivate);

  // Group routes
  app.post('/api/group', authenticate, groupsController.createGroup);

  app.post('/api/group/:groupid/user', authenticate, isValidUsername,
  isGroupMember, groupsController.addUserToGroup);

  app.delete('/api/group/:groupid/user', authenticate, isValidUsername,
  isGroupMember, groupsController.removeUserFromGroup);

  app.post('/api/group/:groupid/leave', authenticate,
  isGroupMember, groupsController.leaveGroup);

  app.get('/api/group/:groupid/users', authenticate,
  isGroupMember, groupsController.getGroupUsers);

  app.post('/api/group/:groupid/message', authenticate,
  isGroupMember, groupsController.sendMessageToGroup);

  app.get('/api/group/:groupid/messages', authenticate,
  isGroupMember, groupsController.getGroupMessages);

  app.get('/api/group/:groupid/notmembers', authenticate,
  isGroupMember, groupsController.searchNonMembers);

  app.patch('/api/group/:groupid/info', authenticate,
  isGroupMember, groupsController.editGroupInfo);

  app.post('/api/group/:groupid/remove', authenticate,
  isGroupMember, groupsController.deleteGroup);

  app.post('/api/group/:groupid/message/:messageid/read', authenticate,
  isGroupMember, groupsController.markAsRead);

  // Recovery routes
  app.post('/api/forgotpassword', usersController.forgotPassword);
  app.post('/api/resetpassword', usersController.resetPassword);
};
