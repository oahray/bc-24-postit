import * as _ from 'lodash';
import randomstring from 'randomstring';
import { User, Message } from '../models';
import { transporter, helperOptions, templates } from '../config/nodemailer';

/**
 * @function signin
 * @summary: API controller to handle requests
 * to create new group
 * @param {object} req: request object
 * @param {object} res: response object
 * @returns {object} api response: user object for
 * successful requests, or error object for
 * requests that fail
 */
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
    return res.header('x-auth', token).status(201).send({
      message: `welcome ${user.username}`,
      user
    });
  })
  .catch(() => res.status(500).send({
    error: 'Internal server error'
  }));
};

/**
 * @function signin
 * @summary: API controller to handle requests
 * to create new group
 * @param {object} req: request object
 * @param {object} res: response object
 * @returns {object} api response
 */
export const signin = (req, res) => {
  const body = _.pick(req.body, ['username', 'password']);
  const username = body.username.trim().toLowerCase();
  if (!body.password) {
    return res.status(400).send({
      error: 'Password must not be empty'
    });
  }
  User.findOne({
    where: {
      username
    }
  })
  .then((user) => {
    if (!user || !user.validPassword(body.password)) {
      return res.status(401).send({
        error: 'Username/Password is incorrect'
      });
    }
    const token = user.generateAuthToken();
    res.header('x-auth', token).status(200).send({
      message: `welcome back, ${user.username}`,
      user
    });
  });
};

export const getMe = (req, res) => {
  const currentUser = req.currentUser;
  return res.status(200).send({ currentUser });
};

export const getAllUsers = (req, res) => {
  User.findAll().then((result) => {
    const users = result.map(user => ({
      id: user.id,
      username: user.username,
      about: user.about,
      email: user.email
    }));
    res.status(200).send({ users });
  });
};

export const getMySentMessages = (req, res) => {
  const userId = req.currentUser.id;
  Message.findAll({ where: { userId } }).then(messages =>
    res.status(200).send({ messages })
  );
};

export const getMyGroups = (req, res) => {
  User.findById(req.currentUser.id).then((user) => {
    user.getGroups().then((userGroups) => {
      res.status(200).send({ userGroups });
    });
  });
};

export const changePassword = (req, res) => {
  const current = req.body.currentpassword;
  const newPassword = req.body.newpassword;
  if (!current) {
    return res.status(400).send({
      error: 'Current password required'
    });
  }
  if (!newPassword) {
    return res.status(400).send({
      error: 'New password required'
    });
  }
  User.findById(req.currentUser.id).then((user) => {
    if (!user.validPassword(current)) {
      return res.status(400).send({
        error: 'Password is incorrect'
      });
    }
    if (current === newPassword) {
      return res.status(400).send({
        error: 'New password is the same as current'
      });
    }
    user.update({ password: newPassword })
    .then((update) => {
      if (update) {
        res.status(201).send({
          message: 'Password successfully updated'
        });
      }
    });
  });
};

export const forgotPassword = (req, res) => {
  const email = req.body.email;
  if (!email) {
    return res.status(400).send({
      error: 'Email is required for password recovery'
    });
  }
  // generate random hash
  const resetHash = randomstring.generate(60);
  // find user with request email
  User.findOne({ where: { email } })
  .then((user) => {
    if (!user) {
      return res.status(404).send({
        error: 'Incorrect email'
      });
    }
    user.update({
      resetHash,
      resetExpiresIn: Date.now() + 3600000
    })
    .then((update) => {
      if (update) {
        const subject = 'Password reset';
        const html = templates.recovery(req, update);
        transporter.sendMail(
          helperOptions(user.email, null, subject, html))
          .then(() => {
            res.send({
              message: `An email with reset instructions has been sent to ${user.email}`
            });
          })
          .catch(() => {
            res.status(500).send({
              error: 'Error sending recovery mail. Please try again later'
            });
          });
      }
    })
    .catch(() => res.status(500).send({
      error: 'Internal server error'
    }));
  });
};

export const resetPassword = (req, res) => {
  const resetHash = req.query.t;
  const password = req.body.password;
  if (!resetHash) {
    return res.status(400).send({
      error: 'Invalid reset link.'
    });
  }
  if (!password) {
    return res.status(400).send({
      error: 'Password is required!'
    });
  }
  User.findOne({
    where: {
      resetHash
    }
  })
  .then((user) => {
    if (!user) {
      return res.status(401).send({
        error: 'Link cannot be validated.'
      });
    }
    if (Number(user.resetExpiresIn) < Date.now()) {
      return res.status(401).send({
        error: 'Reset link has expired.'
      });
    }
    user.update({
      password,
      resetHash: null,
    })
    .then((update) => {
      const token = update.generateAuthToken();
      return res.header('x-auth', token).status(201).send({
        message: 'Your password has been successfully updated.',
        user: update
      });
    });
  });
};

export const editProfile = (req, res) => {
  const { email } = req.body;
  let { about, imageUrl } = req.body;
  if (!email) {
    return res.status(400).send({
      error: 'Email is required'
    });
  }
  if (!imageUrl) {
    imageUrl = '';
  }
  if (!about) {
    about = '';
  }
  req.currentUser.update({
    about, email, imageUrl
  })
  .then((update) => {
    res.status(201).send({
      message: 'Profile successfully updated',
      profile: update
    });
  });
};
