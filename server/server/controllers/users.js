const _ = require('lodash');

const User = require('../models').User;

const signup = (req, res) => {
  const username = req.body.username.toLowerCase();
  const email = req.body.email.toLowerCase();
  User.create({
    username,
    password: req.body.password,
    email,
  })
  .then(user => res.status(201).send(user))
  .catch(err => res.status(400).send(err));
};

const signin = (req, res) => {
  const body = _.pick(req.body, ['username', 'password']);
  User.findOne({
    attributes: {
      exclude: ['password']
    },
    where: { username: body.username.toLowerCase(), password: body.password
    },
  })
  .then((user) => {
    if (!user) {
      return res.status(401).send({});
    }
    res.status(201).send(user);
  }).catch(err => res.status(400).send(err));
};

module.exports = {
  signup,
  signin
};
