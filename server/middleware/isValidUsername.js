export default (req, res, next) => {
  let username = req.body.username;
  if (!username || !username.trim()) {
    return res.status(400).send({
      error: 'Username is required.'
    });
  }
  username = req.body.username.trim().toLowerCase();
  const myRegExp = /\w+|-/g;
  const usernameLength = username.length;
  for (let i = 0; i < usernameLength; i += 1) {
    if (!username[i].match(myRegExp)) {
      return res.status(400).send({
        error: 'Invalid Username format.'
      });
    }
  }
  next();
};
