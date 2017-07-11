const Group = require('../models').Group;
const User = require('../models').User;
const Message = require('../models').Message;

// Function to add create group
const createGroup = (req, res) => {
  const title = req.body.title;
  if (!title) {
    return res.status(400).send({
      error: 'Group title required.'
    });
  }
  Group.create({
    title
  })
  .then((group) => {
    User.findById(req.session.user.id).then((user) => {
      group.addUsers(user.id);
      user.addGroups(group.id);
      res.status(201).send(group);
    }).catch(err => res.status(400).send(err));
  })
  .catch(err => res.status(400).send(err));
};

// Function to add users to groups with username
const addUserToGroup = (req, res) => {
  // Grab username from request body
  const username = req.body.username;
  // Grab groupId from request params
  const groupId = req.param.groupid;
  if (!username) {
    return res.status(400).send({
      error: 'Username required'
    });
  }
  Group.findById(groupId).then((group) => {
    if (!group) {
      return res.status(404).send({
        error: 'Group does not exist'
      });
    }
    // Find a user with that username from request body
    User.findOne({
      where: {
        username: req.body.username.toLowerCase(),
      }
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          error: 'User does not exist with that username'
        });
      }
      group.addUser(user.id);
      user.addGroup(group.id);
      res.status(201);
    }).catch(err => res.status(400).send(err));
  });
};

const getGroupUsers = (req, res) => {
  const groupId = req.params.groupid;
  Group.findById(groupId).then((group) => {
    if (!group) {
      return res.status(404).send({
        error: 'Group does not exist'
      });
    }
    const groupUsers = group.getUsers();
    res.send({ groupUsers });
  })
  .catch(err => res.status(400).send(err));
};

const addMessageToGroup = (req, res) => {
  res.send({ message: 'addMessageToGroup' });
};

const getGroupMessages = (req, res) => {
  res.send({ message: 'getGroupMessages' });
};

module.exports = {
  createGroup,
  addUserToGroup,
  getGroupUsers,
  addMessageToGroup,
  getGroupMessages
};
