import * as _ from 'lodash';
import { Group, User, Message } from '../models';
import { transporter, helperOptions, templates } from '../config/nodemailer';

/**
 * @function create
 * @summary: API controller to handle requests
 * to create new group
 * @param {object} req: request object
 * @param {object} res: response object
 * @returns {object} api response
 */
export const create = (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  let type = req.body.type;
  const createdBy = req.currentUser.username;
  if (!name) {
    return res.status(400).send({
      error: 'Group name is required.'
    });
  }
  if (name.length > 25) {
    return res.status(400).send({
      error: 'Group name too long'
    });
  }
  if (description.length > 70) {
    return res.status(400).send({
      error: 'Group description too long'
    });
  }
  if (!type || type.trim().toLowerCase() !== 'private') {
    type = 'public';
  }
  Group.findOne({ where: { name } })
    .then((result) => {
      if (result) {
        return res.status(400).send({
          error: 'You already have a group with this name'
        });
      }
      Group.create({
        name,
        description,
        createdBy,
        type
      })
        .then((group) => {
          User.findById(req.currentUser.id).then((user) => {
            group.addUser(user.id);
            return res.status(201).send({
              message: 'Group created',
              group
            });
          });
        });
    })
    .catch(() => res.status(500).send({
      error: 'Internal server error'
    }));
};

/**
 * @function addUser
 * @summary: API controller to handle requests
 * to add a user to a group
 * @param {object} req: request object
 * @param {object} res: response object
 * @returns {object} api response
 */
export const addUser = (req, res) => {
  // Grab username from request body
  const username = req.body.username.trim().toLowerCase();
  // Grab group instance from request object.
  // It has been set in the isGroupMember middleware.
  const group = req.group;
  // Group.findById(groupId).then((group) => {
  // Find a user with that username from request body
  User.findOne({
    where: {
      username,
    }
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          error: 'User does not exist with that username'
        });
      }
      group.getUsers({ where: { username } }).then((users) => {
        const io = req.app.get('io');
        if (users.length > 0) {
          return res.status(400).send({
            error: `${user.username} already in group`
          });
        }
        group.addUser(user.id)
          .then(() => {
            io.emit('Added to group', {
              user: {
                id: user.id,
                name: user.name
              },
              group,
              addedBy: req.currentUser.username
            });
            res.status(201).send({
              message: `${user.username} added to group`
            });
          });
      });
    });
};

/**
 * @function removeUser
 * @summary: API controller to handle requests
 * to remove a user from a group
 * @param {object} req: request object
 * @param {object} res: response object
 * @returns {object} api response
 */
export const removeUser = (req, res) => {
  const username = req.body.username.trim().toLowerCase();
  const groupUsernames = req.groupUsernames;
  const io = req.app.get('io');
  const group = req.group;
  if (group.createdBy !== req.currentUser.username) {
    return res.status(401).send({
      error: 'Only a group creator can remove members'
    });
  }
  if (groupUsernames && groupUsernames.indexOf(username) === -1) {
    return res.status(400).send({
      error: 'No such user in specified group'
    });
  }
  if (username === req.currentUser.username) {
    return res.status(400).send({
      error: 'You cannot remove yourself from a group. Leave instead'
    });
  }
  User.findOne({ where: { username } })
    .then((user) => {
      group.removeUser(user.id)
        .then(() => {
          io.emit('Removed from group', {
            user: {
              id: user.id,
              username: user.username
            },
            group,
            removedBy: req.currentUser.username
          });
          return res.status(201).send({
            message: `${user.username} removed from group`
          });
        });
    });
};

/**
 * @function leave
 * @summary: API controller to handle requests
 * to leave a group
 * @param {object} req: request object
 * @param {object} res: response object
 * @returns {object} api response: confirmation that
 * user has left the group
 */
export const leave = (req, res) => {
  const io = req.app.get('io');
  const group = req.group;
  group.getUsers().then((users) => {
    let didDeleteGroup = false;
    if (users.length > 1) {
      group.removeUser(req.currentUser.id)
        .then(() => res.status(201).send({
          message: `You left ${req.currentGroup.name.toUpperCase()}`,
        }));
    } else {
      didDeleteGroup = true;
      group.destroy().then(() => res.status(201).send({
        message: `You left, and ${
          req.currentGroup.name.toUpperCase()
          } has been deleted`
      }));
    }
    io.emit('Left group', {
      user: {
        id: req.currentUser.id,
        username: req.currentUser.username
      },
      group,
      didDeleteGroup
    });
  });
};

/**
 * @function getUsers
 * @summary: API controller to handle requests
 * to get users in a group
 * @param {object} req: request object
 * @param {object} res: response object
 * @returns {array} api response - group users or
 * non-members, depending on query parameters
 */
export const getUsers = (req, res) => {
  const inGroup = req.query.members || 'true';
  if (inGroup !== 'false') {
    return res.send({
      group: req.currentGroup,
      users: req.groupUsers
    });
  }
  // If the query specifies that non-members be returned,
  // Get memebers that are not in the group
  // and implement pagination
  let { username } = req.query;
  let { offset, limit } = req.query;
  limit = Number(limit);
  offset = Number(offset);
  if (!username) {
    username = '';
  }
  const searchOptions = {
    where: {
      username: {
        $iLike: `%${username}%`
      }
    }
  };
  if (offset && typeof offset === 'number') {
    searchOptions.offset = Number(offset);
  }

  if (limit && typeof limit === 'number') {
    searchOptions.limit = Number(limit);
  }

  const usernames = req.groupUsernames;
  searchOptions.where.username.$notIn = usernames;
  User.findAndCountAll(searchOptions)
    .then((result) => {
      const totalCount = result.count;
      let pageCount = 1;

      if (!offset) {
        offset = 0;
      }

      if (!limit) {
        limit = totalCount;
      }

      pageCount = Math.ceil(totalCount / limit);
      const page = Math.ceil((offset + limit) / limit);
      const pageSize = result.rows.length;
      res.status(200).send({
        page,
        pageCount,
        pageSize,
        totalCount,
        users: result.rows
      });
    })
    .catch(() => res.status(500).send({
      error: 'Internal server errors'
    }));
};

/**
 * @function sendMessage
 * @summary: API controller to handle requests
 * to post messages to a group
 * @param {object} req: request object
 * @param {object} res: response object
 * @returns {object} api response - created message
 */
export const sendMessage = (req, res) => {
  const content = req.body.content;
  let priority = req.body.priority;
  if (!content) {
    return res.status(400).send({
      error: 'Message must not be empty'
    });
  }
  if (!priority) {
    priority = 'normal';
  }
  priority = priority.trim().toLowerCase();

  const group = req.group;
  if (!Message.verifyPriority(priority)) {
    return res.status(400).send({
      error: 'Incorrect priority option. Choose NORMAL, URGENT or CRITICAL.'
    });
  }
  Message.create({
    content,
    priority,
    sender: req.currentUser.username,
    readBy: req.currentUser.username
  }).then((message) => {
    message.setGroup(group.id);
    message.setUser(req.currentUser.id);
    const sender = message.sender.toUpperCase();
    // set email message parameters
    // filter out the email of sender
    const bcc = req.groupEmails.filter(email =>
      email !== req.currentUser.email);
    const subject = `New ${message.priority} group message from ${sender}`;
    const html = templates.notification(message, group);
    if ((message.priority === 'urgent' ||
      message.priority === 'critical') &&
      bcc.length > 0) {
      transporter.sendMail(
        helperOptions('You', bcc, subject, html))
        .then(() => {
          console.log('The message email was sent: ');
        })
        .catch(() => { });
    }
    const io = req.app.get('io');
    io.emit('Message posted', {
      message: {
        sender: message.sender
      },
      group: {
        id: group.id,
        name: group.name
      }
    });
    const filtered = {
      id: message.id,
      content: message.content,
      priority: message.priority,
      userId: message.userId,
      groupId: message.groupId
    };
    res.status(201).send({
      sent: filtered
    });
  });
};

/**
 * @function getMessages
 * @summary: API controller to handle requests
 * to get group messages
 * @param {object} req: request object
 * @param {object} res: response object
 * @returns {array} api response - array of group messages
 */
export const getMessages = (req, res) => {
  const groupId = req.params.groupid;
  const group = req.currentGroup;
  Message.findAll({
    where: {
      groupId
    },
    attributes: {
      exclude: ['updatedAt',
        'userId', 'groupId']
    },
    order: [['createdAt', 'ASC']]
  }).then(messages => res.status(200).send({ group, messages }));
};

/**
 * @function markRead
 * @summary: API controller to handle requests to mark
 * message as read by a user when they view it
 * @param {object} req: request object
 * @param {object} res: response object
 * @returns {object} api response
 */
export const markRead = (req, res) => {
  const user = req.currentUser;
  const messageId = req.params.messageid;
  if (!Number(messageId)) {
    return res.status(400).send({
      error: 'Valid message id is required'
    });
  }
  Message.findById(messageId)
    .then((message) => {
      const readers = message.readBy.split(',');
      let readMessage = message;
      if (message && (user.username !== message.sender)
        && (readers.indexOf(user.username)) === -1) {
        message.update({
          readBy: `${message.readBy},${user.username}`
        })
          .then((update) => {
            readMessage = update;
          });
      }
      return res.status(201).send({
        update: readMessage
      });
    });
};

/**
 * @function editInfo
 * @summary: API controller to handle requests
 * to edit group info
 * @param {object} req: request object
 * @param {object} res: response object
 * @returns {object} api response -
 */
export const editInfo = (req, res) => {
  const { name, description, type } = _.pick(
    req.body, ['name', 'description', 'type']
  );
  if (!name) {
    return res.status(400).send({
      error: 'Group name is required'
    });
  }
  const update = {
    name,
    description
  };
  if (!description) {
    update.description = null;
  }

  if (type === 'public' || type === 'private') {
    update.type = type;
  }

  const group = req.group;
  group.update(update)
    .then(updatedGroup => res.status(201).send({
      message: 'Group info successfully updated',
      group: updatedGroup
    }));
};

/**
 * @function deleteGroup
 * @summary: API controller to handle requests
 * to get users in a group
 * @param {object} req: request object
 * @param {object} res: response object
 * @returns {object} api response - delete group
 * confirmation or failure
 */
export const deleteGroup = (req, res) => {
  // Group.findById(req.params.groupid).then((group) => {
  if (req.currentUser.username !== req.group.createdBy) {
    return res.status(401).send({
      error: 'You can only delete groups created by you'
    });
  }
  const group = req.group;
  group.destroy()
    .then(() => res.status(201).send({
      message: 'Group successfully deleted'
    }))
    .catch(() => res.status(500).send({
      error: 'Internal server error'
    }));
};
