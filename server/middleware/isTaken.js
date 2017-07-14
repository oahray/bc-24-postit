import { User } from '../models';

export default (req, res, next) => {
  const username = req.body.username.trim().toLowerCase();
  const email = req.body.email.trim().toLowerCase();
  User.findOne({ where: { username } }).then((user) => {
    if (user) {
      return res.status(400).send({
        error: 'Username already taken.'
      });
    }
  }).catch(err => res.status(400).send(err));

  User.findOne({ where: { email } }).then((user) => {
    if (user) {
      res.status(400).send({
        error: 'Eamil already taken.'
      });
    }
  }).catch(() =>
      res.status(400)
  );

  next();
};
