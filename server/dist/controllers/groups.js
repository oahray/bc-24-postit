'use strict';

var Group = require('../models').Group;
var User = require('../models').User;
var Message = require('../models').Message;

// Function to create new group
var createGroup = function createGroup(req, res) {
  var title = req.body.title;
  if (!title) {
    return res.status(400).send({
      error: 'Group title required.'
    });
  }
  Group.create({
    title: title
  }).then(function (group) {
    User.findById(req.session.user.id).then(function (user) {
      group.addUser(user.id);
      return res.status(201).send({
        message: 'Group created',
        group: group
      });
    }).catch(function (err) {
      return res.status(400).send({
        error: err.errors[0].message
      });
    });
  }).catch(function (err) {
    return res.status(400).send({
      error: err.errors[0].message
    });
  });
};

// Function to add users to groups with username
var addUserToGroup = function addUserToGroup(req, res) {
  // Grab username from request body
  var username = req.body.username;
  // Grab groupId from request params
  var groupId = req.params.groupid;
  if (!username) {
    return res.status(400).send({
      error: 'Username required'
    });
  }
  Group.findById(groupId).then(function (group) {
    if (!group) {
      return res.status(404).send({
        error: 'Group does not exist'
      });
    }
    // Find a user with that username from request body
    User.findOne({
      where: {
        username: req.body.username.toLowerCase()
      }
    }).then(function (user) {
      if (!user) {
        return res.status(404).send({
          error: 'User does not exist with that username'
        });
      }
      group.addUser(user.id);
      // user.addGroup(group.id);
      res.status(201).send({});
    }).catch(function (err) {
      return res.status(400).send({
        error: err.errors[0].message
      });
    });
  });
};

var getGroupUsers = function getGroupUsers(req, res) {
  var groupId = req.params.groupid;
  Group.findById(groupId).then(function (group) {
    if (!group) {
      return res.status(404).send({
        error: 'Group does not exist'
      });
    }
    group.getUsers().then(function (groupUsers) {
      return res.send({ groupUsers: groupUsers });
    });
  }).catch(function (err) {
    return res.status(400).send({
      error: err.errors[0].message
    });
  });
};

var sendMessageToGroup = function sendMessageToGroup(req, res) {
  var content = req.body.content;
  var priority = req.body.priority;
  if (!content || !priority) {
    return res.status(400).send({
      error: 'Message or priority must not be empty'
    });
  }
  priority = priority.trim().toLowerCase();
  Group.findById(req.params.groupid).then(function (group) {
    if (!group) {
      return res.status(404).send({
        error: 'Specified group not found.'
      });
    } else if (!Message.verifyPriority(priority)) {
      return res.status(404).send({
        error: 'Incorrect priority option. Choose NORMAL, URGENT or CRITICAL.'
      });
    }
    Message.create({
      content: content, priority: priority
    }).then(function (message) {
      message.setGroup(group.id);
      message.setUser(req.session.user.id);
      res.status(201).send({ message: message });
    }).catch(function (err) {
      return res.status(400).send({
        error: err.errors[0].message
      });
    });
  }).catch(function (err) {
    return res.status(400).send({
      error: err.errors[0].message
    });
  });
};

var getGroupMessages = function getGroupMessages(req, res) {
  var groupId = req.params.groupid;
  if (!groupId) {
    res.status(400).send({
      error: 'GroupId must be provided'
    });
  }
  // Check if current user is in that group and
  // refuse request if the user isn't
  Group.findById(req.params.id).then(function (group) {
    if (!group.isGroupUser(req.session.user.id)) {
      res.status(401).send({
        error: 'You must belong to a group to view its messages'
      });
    }
  });
  Message.findAll({
    where: {
      groupId: groupId
    }
  }).then(function (messages) {
    res.status(200).send({ messages: messages });
  }).catch(function (err) {
    return res.status(400).send(err);
  });
};

module.exports = {
  createGroup: createGroup,
  addUserToGroup: addUserToGroup,
  getGroupUsers: getGroupUsers,
  sendMessageToGroup: sendMessageToGroup,
  getGroupMessages: getGroupMessages
};