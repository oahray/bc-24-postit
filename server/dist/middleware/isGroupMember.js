'use strict';

var Group = require('../models').Group;

var isGroupUser = function isGroupUser(req, res, next) {
  var groupId = req.params.groupid;
  Group.findById(groupId).then(function (group) {
    if (!group) {
      return res.status(404).send({
        error: 'Specified group does not exist'
      });
    }
    group.getUsers().then(function (groupUsers) {
      var numOfUsers = groupUsers.length;
      var isInGroup = false;
      for (var i = 0; i < numOfUsers; i += 1) {
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
    }).catch(function (err) {
      return res.status(400).send(err);
    });
  });
};

module.exports = isGroupUser;