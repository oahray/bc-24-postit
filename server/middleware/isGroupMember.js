import { Group } from '../models';

export default (req, res, next) => {
  const groupId = req.params.groupid;
  if (!groupId) {
    res.status(400).send({
      error: 'GroupId must be provided'
    });
  }
  Group.findById(groupId).then((group) => {
    if (!group) {
      return res.status(404).send({
        error: 'Specified group does not exist'
      });
    }
    return group.getUsers({ where: { id: req.currentUser.id } })
    .then((groupUsers) => {
      if (groupUsers.length < 1) {
        return res.status(401).send({
          error: 'You must belong to a group to interact with it'
        });
      }
      req.currentGroup = group;
      next();
    });
  });
};
