import { Group } from '../models';

export default (req, res, next) => {
  const groupId = req.params.groupid;
  if (!Number.isInteger(Number(groupId))) {
    return res.status(400).send({
      error: 'Valid group ID must be provided'
    });
  }
  return Group.findById(groupId).then((group) => {
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
