/**
 * @function isValidUsername
 * @description validator middleware that checks
 * provided username in the request body if it
 * contains characters that are not alphanumeric.
 * The request is rejected with an error response
 * of username contains such characters.
 * @param {Object} req: request object
 * @param {Object} res: response object
 * @param {func} next: called to move to
 * the next middleware/controller
 * @returns {Object} success or error response
 */
export default (req, res, next) => {
  let username = req.body.username;
  if (!username || !username.trim()) {
    return res.status(400).send({
      error: 'Username is required.'
    });
  }
  if (username.trim().length < 3) {
    return res.status(400).send({
      error: 'Username cannot be shorter than 3 characters'
    });
  }
  if (username.trim().length > 12) {
    return res.status(400).send({
      error: 'Username cannot be longer than 12 characters'
    });
  }
  username = req.body.username.trim().toLowerCase();
  const myRegExp = /\w+|-/g;
  const usernameLength = username.length;
  for (let i = 0; i < usernameLength; i += 1) {
    if (!username[i].match(myRegExp)) {
      return res.status(400).send({
        error: 'Only alphanumeric characters allowed'
      });
    }
  }
  next();
};
