import * as _ from 'lodash';
import randomstring from 'randomstring';
import { User, Message } from '../models';
import { transporter, helperOptions } from '../config/nodemailer';

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
  })
  .catch(() => res.status(400));
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

// export const refreshToken = (req, res) => {
//   const currentUser = req.currentUser;
//   if (!currentUser) {
//     return res.status(401).send({
//       error: 'Not logged in'
//     });
//   }
//   const token = currentUser.generateAuthToken();
//   res.header('x-auth', token).status(200).send({
//     message: `Token refreshed, ${currentUser.username}`,
//     currentUser
//   });
// };

export const getAllUsers = (req, res) => {
  User.findAll().then(users =>
    res.status(200).send({ users }))
  .catch(() => res.status(400).send({
    error: 'Failed to get list of all users'
  }));
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
  const io = req.app.get('io');
  User.findById(req.currentUser.id).then((user) => {
    user.getGroups().then((userGroups) => {
      res.status(200).send({ userGroups });
    });
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
    user.update({ password })
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
        error: 'Specified email is not linked to any account'
      });
    }
    user.update({
      resetHash,
      resetExpiresIn: Date.now() + 3600000
    })
    .then((update) => {
      if (update) {
        const subject = 'Password reset';
        const html = `<div><h2 style="color:brown">You requested a password reset. </h2>
        <p style="color:black">Click the link below to reset your password, or copy and paste in your browser.</p>
        <p>${req.protocol}://${req.headers.host}/resetpassword?t=${update.resetHash}</p>
        <p style="color:black">If it was not you who made the request, please ignore this mail, and your password <strong>would not</strong> be changed. 
        </p>
        <p style="color:black">Best regards, <br/> The Postit Team</div></p>`;
        transporter.sendMail(
          helperOptions(user.email, null, subject, html), (error, info) => {
            if (error) {
              return res.send({ error });
            }
            res.send({
              message: `An email with reset instructions has been sent to ${user.email}`
            });
          }
        );
      }
    })
    .catch(err => res.send({ err }));
  });
};

export const resetPassword = (req, res) => {
  const resetHash = req.query.t;
  console.log('reset hash: ', resetHash);
  const password = req.body.password;
  if (!resetHash) {
    return res.status(400).send({
      error: 'Invalid reset link. Ensure you are using the latest one'
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
      return res.status(404).send({
        error: 'Reset link is invalid. Ensure it is the last one you received.'
      });
    }
    if (Number(user.resetExpiresIn) < Date.now()) {
      return res.status(404).send({
        error: 'Reset link has expired.'
      });
    }
    user.update({
      password,
      resetHash: null
    })
    .then((update) => {
      const token = update.generateAuthToken();
      return res.header('x-auth', token).send({
        message: 'Your password has been successfully updated.',
        user: update
      });
    });
  });
};

// export const changeEmail = (req, res) => {
//   User.findById(req.currentUser.id).then((user) => {
//     if (req.body.email.toLowerCase() === user.email) {
//       res.status(400).send({ error: 'New email same as current email' });
//     }
//     user.update({ email: req.body.email })
//     .then(updated => res.status(202).send({
//       message: 'Email successfully changed',
//       updated
//     })).catch((err) => {
//       if (err.message) {
//         res.status(400).send({ error: err.message });
//       }
//       res.status(400).send({ error: 'Error updating email' });
//     });
//   }).catch(() => res.status(400).send({
//     error: 'Error changing email'
//   }));
// };

// export const editProfile = (req, res) => {
//   User.findById(req.currentUser.id).then((user) => {
//     if (req.body.email.toLowerCase() === user.email) {
//       res.status(400).send({ error: 'New email same as current email' });
//     }
//     user.update({ email: req.body.email })
//     .then(updated => res.status(202).send({
//       message: 'Email successfully changed',
//       updated
//     })).catch((err) => {
//       if (err.message) {
//         res.status(400).send({ error: err.message });
//       }
//       res.status(400).send({ error: 'Error updating email' });
//     });
//   }).catch(() => res.status(400).send({
//     error: 'Error changing email'
//   }));
// };

// export const deactivate = (req, res) => {
//   const body = _.pick(req.body, ['username', 'password']);
//   if (!body.username) {
//     return res.status(401).send({
//       error: 'You must provide your username to deactivate account'
//     });
//   }
//   const username = body.username.trim().toLowerCase();
//   if (username !== req.currentUser.username) {
//     return res.status(400).send({
//       error: 'Username is incorrect. Provide your own username to deactivate'
//     });
//   }
//   if (!body.password) {
//     return res.status(400).json({
//       error: 'You must provide your password to deactivate account'
//     });
//   }
//   User.findOne({
//     where: {
//       username
//     }
//   })
//   .then((user) => {
//     if (!user.validPassword(body.password)) {
//       return res.status(401).send({
//         error: 'Password is incorrect'
//       });
//     }
//     user.destroy().then(() => res.status(201).send({
//       message: 'Account deactivated'
//     }));
//   }).catch(() => res.status(400).send({
//     error: 'Could not deactivate account'
//   }));
// };
