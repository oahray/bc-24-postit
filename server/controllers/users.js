import * as _ from 'lodash';
import bcrypt from 'bcryptjs';
import { User, Message } from '../models';

// Function to signup new users
export const signup = (req, res) => {
  const username = req.body.username.trim().toLowerCase();
  const email = req.body.email.trim().toLowerCase();
  User.create({
    username,
    password: req.body.password,
    email,
  })
  .then((user) => {
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
  if (!body.password) {
    return res.status(400).json({
      error: 'Password must not be empty'
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
    const token = user.generateAuthToken();
    res.header('x-auth', token).status(200).send({
      message: `welcome back, ${user.username}`,
      user
    });
  }).catch(() => res.status(400));
};

export const getMe = (req, res) => {
  const currentUser = req.currentUser;
  if (!currentUser) {
    return res.status(401).send({
      error: 'Not logged in'
    });
  }
  return res.status(200).send({ currentUser });
};

export const refreshToken = (req, res) => {
  const currentUser = req.currentUser;
  if (!currentUser) {
    return res.status(401).send({
      error: 'Not logged in'
    });
  }
  const token = currentUser.generateAuthToken();
  res.header('x-auth', token).status(200).send({
    message: `Token refreshed, ${currentUser.username}`,
    currentUser
  });
};

export const getAllUsers = (req, res) => {
  User.findAll().then(users =>
    res.status(200).send({ users }))
  .catch(() => res.status(400).send({
    error: 'Failed to get list of all users'
  }));
};

export const searchUsers = (req, res) => {
  const { username, offset, limit } = req.query;
  const searchOptions = { 
    where : {
      username: { 
        $iLike: `%${username}%` 
      }
    }
  }
  if (offset) {
    searchOptions.offset = offset;
  }

  if (limit) {
    searchOptions.limit = limit;
  }
  User.findAll(searchOptions)
  .then((users) => {
    return res.status(200).send({
    users
  })
  })
  .catch(err => res.status(400).send(err));
};

export const getMySentMessages = (req, res) => {
  const userId = req.currentUser.id;
  Message.findAll({ where: { userId } }).then(messages =>
    res.status(200).send({ messages })
  ).catch(err => res.status(400).send({
    error: err.errors[0].message
  }));
};

export const getMyGroups = (req, res) => {
  User.findById(req.currentUser.id).then((user) => {
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
  User.findById(req.currentUser.id).then((user) => {
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
  User.findById(req.currentUser.id).then((user) => {
    if (req.body.email.toLowerCase() === user.email) {
      res.status(400).send({ error: 'New email same as current email' });
    }
    user.update({ email: req.body.email })
    .then(updated => res.status(202).send({
      message: 'Email successfully changed',
      updated
    })).catch((err) => {
      if (err.message) {
        res.status(400).send({ error: err.message });
      }
      res.status(400).send({ error: 'Error updating email' });
    });
  }).catch(() => res.status(400).send({
    error: 'Error changing email'
  }));
};

export const deactivate = (req, res) => {
  const body = _.pick(req.body, ['username', 'password']);
  if (!body.username) {
    return res.status(401).send({
      error: 'You must provide your username to deactivate account'
    });
  }
  const username = body.username.trim().toLowerCase();
  if (username !== req.currentUser.username) {
    return res.status(400).send({
      error: 'Username is incorrect. Provide your own username to deactivate'
    });
  }
  if (!body.password) {
    return res.status(400).json({
      error: 'You must provide your password to deactivate account'
    });
  }
  User.findOne({
    where: {
      username
    }
  })
  .then((user) => {
    if (!user.validPassword(body.password)) {
      return res.status(401).send({
        error: 'Password is incorrect'
      });
    }
    user.destroy().then(() => res.status(201).send({
      message: 'Account deactivated'
    }));
  }).catch(() => res.status(400).send({
    error: 'Could not deactivate account'
  }));
};
