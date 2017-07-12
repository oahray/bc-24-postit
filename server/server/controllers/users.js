const _ = require('lodash');

const User = require('../models').User;
const Message = require('../models').Message;

// Function to signup new users
const signup = (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    return res.status(400).json({
      error: 'Username, Email, and Password must not be empty'
    });
  }
  const username = req.body.username.toLowerCase();
  const email = req.body.email.toLowerCase();
  User.create({
    username,
    password: req.body.password,
    email,
  })
  .then((user) => {
    req.session.user = _.pick(user.dataValues, [
      'id', 'username', 'email', 'createdAt', 'updatedAt'
    ]);
    res.status(201).send(user);
  })
  .catch(err => res.status(400).send(err));
};

// Function to sign users in
const signin = (req, res) => {
  const body = _.pick(req.body, ['username', 'password']);
  if (!body.username || !body.password) {
    return res.status(400).json({
      error: 'Username or Password must not be empty'
    });
  }
  User.findOne({
    where: {
      username: body.username.toLowerCase(),
    }
  })
  .then((user) => {
    if (!user) {
      return res.status(401).send({
        error: 'User not found'
      });
    }
    if (!user.validPassword(body.password)) {
      return res.status(401).send({
        error: 'Password is incorrect'
      });
    }
    req.session.user = _.pick(user.dataValues, [
      'id', 'username', 'email', 'createdAt', 'updatedAt'
    ]);
    res.status(200).send(user);
  }).catch(err => res.status(400).send(err));
};

const getMe = (req, res) => {
  const user = req.session.user;
  if (!user) {
    return res.status(401).send({
      error: 'Not logged in'
    });
  }
  res.send({ user });
};

const getMySentMessages = (req, res) => {
  const userId = req.session.user.id;
  Message.findAll({ where: { userId } }).then(messages =>
    res.status(200).send({ messages })
  ).catch(err => res.status(400).send(err));
};

const getMyGroups = (req, res) => {
  User.findById(req.session.user.id).then((user) => {
    user.getGroups().then(userGroups =>
      res.status(200).send({ userGroups })
    );
  });
};

const logout = (req, res) => {
  res.clearCookie('user_sid');
  res.status(204).send({});
};

module.exports = {
  signup,
  signin,
  getMe,
  getMySentMessages,
  getMyGroups,
  logout
};
