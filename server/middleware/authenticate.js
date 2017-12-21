import jwt from 'jsonwebtoken';
import { User } from '../models';

/**
 * @function authenticate
 * @description validator middleware that checks
 * provided token in header and authenticates
 * or rejects request based on token status
 * @param {Object} req: request object
 * @param {Object} res: response object
 * @param {func} next: called to move to
 * the next middleware/controller
 * @returns {Object} success or error response
 */
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
