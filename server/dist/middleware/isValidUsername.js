'use strict';

var isValidUsername = function isValidUsername(req, res, next) {
  var username = req.body.username;
  if (!username) {
    return res.status(400).send({
      error: 'Username is required.'
    });
  }
  username = req.body.username.trim();
  var myRegExp = /\w+|-/g;
  var usernameLength = username.length;
  for (var i = 0; i < usernameLength; i += 1) {
    if (!username[i].match(myRegExp)) {
      return res.status(400).send({
        error: 'Username should contain only alphanumeric,\n        underscore (_) or dash (-) characters.'
      });
    }
  }
  next();
};

module.exports = isValidUsername;