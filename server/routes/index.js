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

  app.use(authenticate);

  app.get('/api/user/me', usersController.getMe);

  app.get('/api/user/all', usersController.getAllUsers);

  app.get('/api/user/me/groups', usersController.getMyGroups);

  app.get('/api/user/me/messages', usersController.getMySentMessages);

  app.patch('/api/user/me/password', usersController.changePassword);

  app.patch('/api/user/me/email', usersController.changeEmail);

  app.post('/api/user/logout', usersController.logout);

  app.post('/api/user/deactivate', isValidUsername,
    usersController.deactivate);

  // Group routes
  app.post('/api/group', groupsController.createGroup);

  app.post('/api/group/:groupid/user', isValidUsername,
  isGroupMember, groupsController.addUserToGroup);

  app.post('/api/group/:groupid/leave',
  isGroupMember, groupsController.leaveGroup);

  app.get('/api/group/:groupid/users',
  isGroupMember, groupsController.getGroupUsers);

  app.post('/api/group/:groupid/message',
  isGroupMember, groupsController.sendMessageToGroup);

  app.get('/api/group/:groupid/messages',
  isGroupMember, groupsController.getGroupMessages);

  app.patch('/api/group/:groupid/rename',
  isGroupMember, groupsController.renameGroup);

  app.patch('/api/group/:groupid/type',
  isGroupMember, groupsController.changeGroupType);

  app.patch('/api/group/:groupid/description',
  isGroupMember, groupsController.changeGroupDescription);

  app.post('/api/group/:groupid/remove',
  isGroupMember, groupsController.deleteGroup);
};
