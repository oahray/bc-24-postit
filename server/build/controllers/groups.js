'use strict';

var Group = require('../models').Group;

var createGroup = function createGroup(req, res) {
  Group.create({
    title: req.body.title
  }).then(function (group) {
    return res.status(201).send(group);
  }).catch(function (err) {
    return res.status(400).send(err);
  });
};

var addUserToGroup = function addUserToGroup(req, res) {
  res.send({ message: 'addUserToGroup' });
};

var getGroupUsers = function getGroupUsers(req, res) {
  res.send({ message: 'getGroupUsers' });
};

var addMessageToGroup = function addMessageToGroup(req, res) {
  res.send({ message: 'addMessageToGroup' });
};

var getGroupMessages = function getGroupMessages(req, res) {
  res.send({ message: 'getGroupMessages' });
};

module.exports = {
  createGroup: createGroup,
  addUserToGroup: addUserToGroup,
  getGroupUsers: getGroupUsers,
  addMessageToGroup: addMessageToGroup,
  getGroupMessages: getGroupMessages
};
//# sourceMappingURL=groups.js.map