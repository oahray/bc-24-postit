import * as _ from 'lodash';
import bcrypt from 'bcryptjs';
import { User, Message } from '../models';

// Function to signup new users
export const signup = (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    return res.status(400).json({
      error: 'Username, Email, and Password must not be empty'
    });
  }
  const username = req.body.username.trim().toLowerCase();
  const email = req.body.email.trim().toLowerCase();
  User.create({
    username,
    password: req.body.password,
    email,
  })
  .then((user) => {
    req.session.user = _.pick(user.dataValues, [
      'id', 'username', 'email', 'createdAt', 'updatedAt'
    ]);
    const token = user.generateAuthToken();
    res.header('x-auth', token).status(201).send({
      message: `welcome ${user.username}`,
      user
    });
  })
  .catch(() => res.status(400));
};

// Function to sign users in
export const signin = (req, res) => {
  const body = _.pick(req.body, ['username', 'password']);
  const username = body.username.trim().toLowerCase();
  if (!username || !body.password) {
    return res.status(400).json({
      error: 'Username or Password must not be empty'
    });
  }
  User.findOne({
    where: {
      username
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
    const token = user.generateAuthToken();
    res.header('x-auth', token).status(200).send({
      message: `welcome back, ${user.username}`,
      user
    });
  }).catch(() => res.status(400));
};

export const getMe = (req, res) => {
  const user = req.session.user;
  if (!user) {
    return res.status(401).send({
      error: 'Not logged in'
    });
  }
  res.send({ user });
};

export const getMySentMessages = (req, res) => {
  const userId = req.session.user.id;
  Message.findAll({ where: { userId } }).then(messages =>
    res.status(200).send({ messages })
  ).catch(err => res.status(400).send({
    error: err.errors[0].message
  }));
};

export const getMyGroups = (req, res) => {
  User.findById(req.session.user.id).then((user) => {
    user.getGroups().then(userGroups =>
      res.status(200).send({ userGroups })
    );
  });
};

export const changePassword = (req, res) => {
  const password = req.body.password;
  if (!password) {
    return res.status(400).send({
      error: 'Password required'
    });
  }
  User.findById(req.session.user.id).then((user) => {
    if (user.validPassword(password)) {
      return res.status(400).send({
        error: 'New password is same as current password'
      });
    }
    const passwordHash = bcrypt.hashSync(password,
    bcrypt.genSaltSync(10), null);
    user.update({ password: passwordHash })
    .then((update) => {
      if (update) {
        res.status(201).send({
          message: 'Password successfully updated'
        });
      }
    }).catch(() => res.status(400).send({
      error: 'Password could not be updated'
    }));
  }).catch((err) => {
    if (!err.message) {
      return res.status(400).send({
        error: err.message
      });
    }
  });
};

export const changeEmail = (req, res) => {
  User.findById(req.session.user.id).then((user) => {
    user.update({ email: req.body.email })
    .then(updated => res.status(202).send({
      message: 'Email successfully changed',
      updated
    })).catch(e => res.send(400, e));
  }).catch(() => res.status(400).send({
    error: 'Error changing email'
  }));
};

export const logout = (req, res) => {
  res.clearCookie('user_sid');
  res.status(204).send({});
};
