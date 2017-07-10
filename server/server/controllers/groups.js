const Group = require('../models').Group;

const createGroup = (req, res) => {
  Group.create({
    title: req.body.title
  })
  .then(group => res.status(201).send(group))
  .catch(err => res.status(400).send(err));
};

module.exports = {
  createGroup,
};
