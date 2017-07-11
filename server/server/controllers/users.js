const _ = require('lodash');

const User = require('../models').User;

// Function to signup new users
const signup = (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    return res.status(400).json({
      error: 'Username, Email, and Password must not be empty'
    });
  }
  const username = req.body.username.toLowerCase();
  const email = req.body.email.toLowerCase();
  const hashedPassword = User.generateHash(req.body.password);
  User.create({
    username,
    password: hashedPassword,
    email,
  })
  .then((user) => {
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
    where: { username: body.username.toLowerCase(),
    },
  })
  .then((user) => {
    if (!user) {
      return res.status(401).send({
        error: 'User not found'
      });
    }
    console.log('password: ', body.password);
    const valid = user.validPassword(body.password);
    if (!valid) {
      return res.status(401).send({
        error: 'Password is incorrect'
      });
    }
    res.status(201).send(user);
  }).catch(err => res.status(400).send(err));
};

const getMe = (req, res) => {
  res.send({ message: 'getMe' });
};

const getMyGroups = (req, res) => {
  res.send({ message: 'getMyGroups' });
};

const logout = (req, res) => {
  res.send({ message: 'logout' });
};

module.exports = {
  signup,
  signin,
  getMe,
  getMyGroups,
  logout
};
