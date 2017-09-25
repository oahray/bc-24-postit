import jwt from 'jsonwebtoken';
import { User } from '../models';

// middleware function to check for logged-in users
export default (req, res, next) => {
  const token = req.header('x-auth');
  if (!token) {
    return res.status(401).send({
      error: 'You need to signup or login first'
    });
  }
  jwt.verify(token, process.env.MY_SUPER_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        error: 'Invalid authentication. Please signin or signup'
      });
    }
    User.findById(decoded.id).then((user) => {
      if (!user) {
        return res.status(401).send({
          error: 'User could not be verifed. Signup or login first'
        });
      }
      req.currentUser = user;
      next();
    });
  });
};
