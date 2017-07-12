const isValidUsername = (req, res, next) => {
  const username = req.body.username.trim();
  if (!username) {
    return res.status(400).send({
      error: 'Username is required.'
    });
  }
  const myRegExp = /\w+|-/g;
  const usernameLength = username.length;
  for (let i = 0; i < usernameLength; i += 1) {
    if (!username[i].match(myRegExp)) {
      return res.status(400).send({
        error: `Username should contain only alphanumeric,
        underscore (_) or dash (-) characters.`
      });
    }
  }
  next();
};

module.exports = isValidUsername;
