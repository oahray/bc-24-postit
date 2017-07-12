const Group = require('../models').Group;

const isGroupUser = (req, res, next) => {
  const groupId = req.params.groupid;
  Group.findById(groupId).then((group) => {
    if (!group) {
      return res.status(404).send({
        error: 'Specified group does not exist'
      });
    }
    group.getUsers().then((groupUsers) => {
      const numOfUsers = groupUsers.length;
      let isInGroup = false;
      for (let i = 0; i < numOfUsers; i += 1) {
        if (groupUsers[i].id === req.session.user.id) {
          isInGroup = true;
        }
      }
      if (!isInGroup) {
        return res.status(401).send({
          error: 'You must belong to a group to interact with it'
        });
      }
      next();
    }).catch(err => res.status(400).send(err));
  });
};

module.exports = isGroupUser;
