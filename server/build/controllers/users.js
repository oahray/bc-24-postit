'use strict';

var _ = require('lodash');

var User = require('../models').User;

// Function to signup new users
var signup = function signup(req, res) {
  if (!req.body.username || !req.body.email || !req.body.password) {
    return res.status(400).json({
      error: 'Username, Email, and Password must not be empty'
    });
  }
  var username = req.body.username.toLowerCase();
  var email = req.body.email.toLowerCase();
  var hashedPassword = User.generateHash(req.body.password);
  User.create({
    username: username,
    password: hashedPassword,
    email: email
  }).then(function (user) {
    res.status(201).send(user);
  }).catch(function (err) {
    return res.status(400).send(err);
  });
};

// Function to sign users in
var signin = function signin(req, res) {
  var body = _.pick(req.body, ['username', 'password']);
  if (!body.username || !body.password) {
    return res.status(400).json({
      error: 'Username or Password must not be empty'
    });
  }
  User.findOne({
    where: { username: body.username.toLowerCase()
    }
  }).then(function (user) {
    if (!user) {
      return res.status(401).send({
        error: 'User not found'
      });
    }
    console.log('password: ', body.password);
    var valid = user.validPassword(body.password);
    if (!valid) {
      return res.status(401).send({
        error: 'Password is incorrect'
      });
    }
    res.status(201).send(user);
  }).catch(function (err) {
    return res.status(400).send(err);
  });
};

var getMe = function getMe(req, res) {
  res.send({ message: 'getMe' });
};

var getMyGroups = function getMyGroups(req, res) {
  res.send({ message: 'getMyGroups' });
};

var logout = function logout(req, res) {
  res.send({ message: 'logout' });
};

module.exports = {
  signup: signup,
  signin: signin,
  getMe: getMe,
  getMyGroups: getMyGroups,
  logout: logout
};
//# sourceMappingURL=users.js.map