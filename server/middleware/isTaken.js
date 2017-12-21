import { User } from '../models';

/**
 * @function isTaken
 * @summary middleware that checks if username or email
 * is taken when a user tries to sign up
 * @param {Object} req
 * @param {Object} res
 * @param {function} next
 * @returns {Object | undefined} error object
 * or undefined if next is called
 */
const isTaken = (req, res, next) => {
  if (!req.body.password || !req.body.password.trim()) {
    return res.status(400).send({
      error: 'Password is required.'
    });
  }
  const username = req.body.username.trim().toLowerCase();
  const email = req.body.email.trim().toLowerCase();
  User.findOne({ where: { username } }).then((user) => {
    if (user) {
      return res.status(409).send({
        error: 'Username already taken.'
      });
    }
    User.findOne({ where: { email } }).then((updatedUser) => {
      if (updatedUser) {
        return res.status(409).send({
          error: 'Email already taken.'
        });
      }
      next();
    });
  });
};

export default isTaken;
