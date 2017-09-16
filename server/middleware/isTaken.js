import { User } from '../models';

export default (req, res, next) => {
  if (!req.body.email) {
    return res.status(400).send({
      error: 'Email is required.'
    });
  } else if (!req.body.password || !req.body.password.trim()) {
    return res.status(400).send({
      error: 'Password is required.'
    });
  }
  const username = req.body.username.trim().toLowerCase();
  const email = req.body.email.trim().toLowerCase();
  User.findOne({ where: { username } }).then((user) => {
    if (user) {
      return res.status(400).send({
        error: 'Username already taken.'
      });
    }
    User.findOne({ where: { email } }).then((userAgain) => {
      if (userAgain) {
        res.status(400).send({
          error: 'Email already taken.'
        });
      }
      next();
    });
  });
};
