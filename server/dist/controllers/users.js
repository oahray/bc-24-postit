'use strict';

var _ = require('lodash');

var User = require('../models').User;
var Message = require('../models').Message;

// Function to signup new users
var signup = function signup(req, res) {
  if (!req.body.username || !req.body.email || !req.body.password) {
    return res.status(400).json({
      error: 'Username, Email, and Password must not be empty'
    });
  }
  var username = req.body.username.trim().toLowerCase();
  var email = req.body.email.trim().toLowerCase();
  User.create({
    username: username,
    password: req.body.password,
    email: email
  }).then(function (user) {
    req.session.user = _.pick(user.dataValues, ['id', 'username', 'email', 'createdAt', 'updatedAt']);
    res.status(201).send(user);
  }).catch(function (err) {
    if (err) {
      res.status(400).send({ error: err.errors[0].message });
    }
  });
};

// Function to sign users in
var signin = function signin(req, res) {
  var body = _.pick(req.body, ['username', 'password']);
  var username = body.username.trim().toLowerCase();
  if (!username || !body.password) {
    return res.status(400).json({
      error: 'Username or Password must not be empty'
    });
  }
  User.findOne({
    where: {
      username: username
    }
  }).then(function (user) {
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
    req.session.user = _.pick(user.dataValues, ['id', 'username', 'email', 'createdAt', 'updatedAt']);
    res.status(200).send(user);
  }).catch(function (err) {
    return res.status(400).send({
      error: err.errors[0].message
    });
  });
};

var getMe = function getMe(req, res) {
  var user = req.session.user;
  if (!user) {
    return res.status(401).send({
      error: 'Not logged in'
    });
  }
  res.send({ user: user });
};

var getMySentMessages = function getMySentMessages(req, res) {
  var userId = req.session.user.id;
  Message.findAll({ where: { userId: userId } }).then(function (messages) {
    return res.status(200).send({ messages: messages });
  }).catch(function (err) {
    return res.status(400).send({
      error: err.errors[0].message
    });
  });
};

var getMyGroups = function getMyGroups(req, res) {
  User.findById(req.session.user.id).then(function (user) {
    user.getGroups().then(function (userGroups) {
      return res.status(200).send({ userGroups: userGroups });
    });
  });
};

var logout = function logout(req, res) {
  res.clearCookie('user_sid');
  res.status(204).send({});
};

module.exports = {
  signup: signup,
  signin: signin,
  getMe: getMe,
  getMySentMessages: getMySentMessages,
  getMyGroups: getMyGroups,
  logout: logout
};