const Group = require('../models').Group;
const User = require('../models').User;
const Message = require('../models').Message;

// Function to create new group
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
      group.addUser(user.id);
      res.status(201).send({ group, user });
    }).catch(err => res.status(400).send(err));
  })
  .catch(err => res.status(400).send(err));
};

// Function to add users to groups with username
const addUserToGroup = (req, res) => {
  // Grab username from request body
  const username = req.body.username;
  // Grab groupId from request params
  const groupId = req.params.groupid;
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
      // user.addGroup(group.id);
      res.status(201).send({});
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
    group.getUsers().then(groupUsers =>
      res.send({ groupUsers }));
  })
  .catch(err => res.status(400).send(err));
};

const sendMessageToGroup = (req, res) => {
  const content = req.body.content;
  const priority = req.body.priority;
  if (!content || !priority) {
    return res.status(400).send({
      error: 'message must not be empty'
    });
  }
  Group.findById(req.params.groupid).then((group) => {
    if (!group) {
      return res.status(404).send({
        error: 'Group not found.'
      });
    } else if (!Message.verifyPriority(priority)) {
      return res.status(404).send({
        error: 'Incorrect priority option. Choose NORMAL, URGENT or CRITICAL.'
      });
    }
    Message.create({
      content, priority
    }).then((message) => {
      message.setGroup(group.id);
      message.setUser(req.session.user.id);
      res.status(201).send({ message });
    }).catch(err => res.status(400).send(err));
  }).catch(err => res.status(400).send(err));
};

const getGroupMessages = (req, res) => {
  const groupId = req.params.groupid;
  if (!groupId) {
    res.status(400).send({
      error: 'GroupId must be provided'
    });
  }
  // Check if current user is in that group and
  // refuse request if the user isn't
  Group.findById(req.params.id).then((group) => {
    if (!group.isGroupUser(req.session.user.id)) {
      res.status(401).send({
        error: 'You must belong to a group to view its messages'
      });
    }
  });
  Message.findAll({
    where: {
      groupId
    }
  }).then((messages) => {
    res.status(200).send({ messages });
  }).catch(err => res.status(400).send(err));
};

module.exports = {
  createGroup,
  addUserToGroup,
  getGroupUsers,
  sendMessageToGroup,
  getGroupMessages
};
