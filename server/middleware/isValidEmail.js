import Validator from 'validatorjs';

/**
 * @function isValidEmail
 * @description validator middleware that checks
 * provided email in request body if it is of
 * email format. Requests with invalid emails are
 * rejected with an error message
 * @param {Object} req: request object
 * @param {Object} res: response object
 * @param {func} next: called to move to
 * the next middleware/controller
 * @returns {Object} success or error response
 */
export default (req, res, next) => {
  let email = req.body.email;
  if (!email || !email.trim) {
    return res.status(400).send({
      error: 'Email is required.'
    });
  }

  email = req.body.email.trim().toLowerCase();
  const validation = new Validator({
    email
  }, {
    email: 'email'
  });
  if (validation.fails()) {
    return res.status(400).send({
      error: 'Invalid email format.'
    });
  }

  next();
};
