'use strict';

var Group = require('../models').Group;

var createGroup = function createGroup(req, res) {
  Group.create({
    title: req.body.title
  }).then(function (group) {
    return res.status(201).send(group);
  }).catch(function (err) {
    return res.status(400).send(err);
  });
};

module.exports = {
  createGroup: createGroup
};
//# sourceMappingURL=groups.js.map