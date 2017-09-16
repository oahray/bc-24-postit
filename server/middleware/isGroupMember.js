import { Group } from '../models';

export default (req, res, next) => {
  const groupId = req.params.groupid;
  if (!Number(groupId)) {
    return res.status(400).send({
      error: 'GroupId must be provided'
    });
  }
  Group.findById(groupId).then((group) => {
    if (!group) {
      return res.status(404).send({
        error: 'Specified group does not exist'
      });
    }
    group.getUsers(
      { raw: true }
    )
    .then((groupUsers) => {
      req.groupUsers = groupUsers;
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
  });
};
