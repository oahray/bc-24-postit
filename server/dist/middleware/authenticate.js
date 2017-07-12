'use strict';

// middleware function to check for logged-in users
var authenticate = function authenticate(req, res, next) {
  if (!req.session.user || !req.cookies.user_sid) {
    return res.status(401).send({
      error: 'You need to signup or login first'
    });
  }
  next();
};

module.exports = authenticate;