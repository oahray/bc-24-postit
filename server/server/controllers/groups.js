const Group = require('../models').Group;

const createGroup = (req, res) => {
  Group.create({
    title: req.body.title
  })
  .then(group => res.status(201).send(group))
  .catch(err => res.status(400).send(err));
};

const addUserToGroup = (req, res) => {
  res.send({ message: 'addUserToGroup' });
};

const getGroupUsers = (req, res) => {
  res.send({ message: 'getGroupUsers' });
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
