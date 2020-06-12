import { Group } from '../models';

/**
 * @function isGroupMember
 *
 * @description middleware that checks
 * if the current user is a  member of a group
 * specified by the groupid parameter.
 * The request is rejected or allowed if user
 * does not belong to group, or allowed to proceed
 * to endpoint controller if it is.
 *
 * @param {Object} req: request object
 * @param {Object} res: response object
 * @param {func} next: called to move to
 * the next middleware/controller
 * @returns {Object} success or error response
 */
export default (req, res, next) => {
  const groupId = req.params.groupid;
  if (!Number.isInteger(Number(groupId))) {
    return res.status(400).send({
      error: 'Valid group ID must be provided'
    });
  }
  return Group.findByPk(groupId).then((group) => {
    if (!group) {
      return res.status(404).send({
        error: 'Specified group does not exist'
      });
    }
    req.group = group;
    return group.getUsers(
      {
        raw: true,
        attributes: {
          exclude: 'password'
        }
      }
    )
    .then((groupUsers) => {
      req.groupUsers = groupUsers.map(user => ({
        id: user.id,
        username: user.username,
        about: user.about,
        imageUrl: user.imageUrl
      }));
      req.groupEmails = groupUsers.map(user => user.email);
      req.groupUsernames = groupUsers.map(user => user.username);
      req.currentGroup = group;
      const groupUserIds = groupUsers.map(user => user.id);

      if (groupUserIds.indexOf(req.currentUser.id) === -1) {
        return res.status(401).send({
          error: 'You must belong to a group to interact with it'
        });
      }
      next();
    });
  })
  .catch(() => res.status(500).send({
    error: 'Internal server error'
  }));
};
