import Validator from 'validatorjs';

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
