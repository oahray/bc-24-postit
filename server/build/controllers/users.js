'use strict';

var _ = require('lodash');

var User = require('../models').User;

var signup = function signup(req, res) {
  var username = req.body.username.toLowerCase();
  var email = req.body.email.toLowerCase();
  User.create({
    username: username,
    password: req.body.password,
    email: email
  }).then(function (user) {
    return res.status(201).send(user);
  }).catch(function (err) {
    return res.status(400).send(err);
  });
};

var signin = function signin(req, res) {
  var body = _.pick(req.body, ['username', 'password']);
  User.findOne({
    attributes: {
      exclude: ['password']
    },
    where: { username: body.username.toLowerCase(), password: body.password
    }
  }).then(function (user) {
    if (!user) {
      return res.status(401).send({});
    }
    res.status(201).send(user);
  }).catch(function (err) {
    return res.status(400).send(err);
  });
};

module.exports = {
  signup: signup,
  signin: signin
};
//# sourceMappingURL=users.js.map