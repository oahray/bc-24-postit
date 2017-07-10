const _ = require('lodash');

const User = require('../models').User;

const signup = (req, res) =>
  User.create({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  })
  .then(user => res.status(201).send(user))
  .catch(err => res.status(400).send(err));

const signin = (req, res) => {
  const body = _.pick(req.body, ['username', 'password']);
  User.findOne({
    attributes: {
      exclude: ['password']
    },
    where: { username: body.username, password: body.password
    },
  })
  .then(user => res.status(201).send(user))
  .catch(err => res.status(400).send(err));
};

module.exports = {
  signup,
  signin
};
