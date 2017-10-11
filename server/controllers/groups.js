import * as _ from 'lodash';
import { Group, User, Message } from '../models';
import { transporter, helperOptions } from '../config/nodemailer';

// Function to create new group
export const createGroup = (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  let type = req.body.type;
  const createdBy = req.currentUser.username;
  if (!name) {
    return res.status(400).send({
      error: 'Group name is required.'
    });
  }
  if (!type || type.trim().toLowerCase() !== 'private') {
    type = 'public';
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
};

// Function to add users to groups with username
export const addUserToGroup = (req, res) => {
  // Grab username from request body
  const username = req.body.username.trim().toLowerCase();
  // Grab groupId from request params
  const groupId = req.params.groupid;
  Group.findById(groupId).then((group) => {
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
          if (process.env.NODE_ENV !== 'test') {
            io.emit('Added to group', {
              user: {
                id: user.id,
                name: user.name
              },
              group,
              addedBy: req.currentUser.username
            });
          }
          res.status(201).send({
            message: `${user.username} added to group`
          });
        });
      });
    });
  });
};

export const removeUserFromGroup = (req, res) => {
  const username = req.body.username.trim().toLowerCase();
  const groupUsernames = req.groupUsernames;
  Group.findById(req.params.groupid).then((group) => {
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
      .then(() => res.status(201).send({
        message: `${user.username} removed from group`
      }));
    });
  });
};

export const leaveGroup = (req, res) => {
  Group.findById(req.params.groupid).then((group) => {
    group.getUsers().then((users) => {
      if (users.length > 1) {
        return group.removeUser(req.currentUser.id)
        .then(() => res.status(201).send({
          message: `${req.currentUser.username} has left the group`,
        }));
      }
      group.destroy().then(() => res.status(201).send({
        message: `${req.currentUser.username} left, and group deleted`
      }));
    });
  });
};

export const getGroupUsers = (req, res) => {
  res.send({
    group: req.currentGroup,
    users: req.groupUsers
  });
};

// Get memebers that are not in the group
// implement pagination
export const searchNonMembers = (req, res) => {
  const groupId = req.params.groupid;
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

  Group.findById(groupId).then((group) => {
    group.getUsers().then(groupUsers =>
      groupUsers.map(user => user.username)
    )
    .then((usernames) => {
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
      });
    });
  })
  .catch(() => res.status(500));
};

export const sendMessageToGroup = (req, res) => {
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
  Group.findById(req.params.groupid).then((group) => {
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
      const bcc = req.groupEmails.filter(email => email !== req.currentUser.email);
      const subject = `New ${message.priority} group message from ${sender}`;
      const html = `<div>
      <p>You have received a new ${message.priority} message from <strong>${sender}</strong> in your group <strong>'${group.name}'</strong></p>
      <div style="color:brown"><h3>${message.content.replace(/\n/gi, '<br/>')}</h3></div>
      <p>To reply ${sender}, please login to your account</p>
      </div>`;
      if ((message.priority === 'urgent' || message.priority === 'critical') && bcc.length > 0) {
        transporter.sendMail(
          helperOptions('You', bcc, subject, html), (error, info) => {
            if (error) {
              return console.log('Message could not be sent: ', error);
            }
            console.log('The message was sent: ', info);
          }
        );
      }
      if (process.env.NODE_ENV !== 'test') {
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
      }
      res.status(201).send({ message });
    });
  }).catch(() => res.status(500));
};

export const getGroupMessages = (req, res) => {
  const groupId = req.params.groupid;
  const group = req.currentGroup;
  Message.findAll({
    where: {
      groupId
    },
    order: [['createdAt', 'DESC']]
  }).then(messages => res.status(200).send({ group, messages }))
    .catch(err => res.status(500).send(err));
};

export const markAsRead = (req, res) => {
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

export const editGroupInfo = (req, res) => {
  const groupId = req.params.groupid;
  const {name, description, type} = _.pick(
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

  Group.findById(groupId)
  .then((group) => {
    group.update(update)
    .then(updatedGroup => res.status(201).send({
      message: 'Group info successfully updated',
      group: updatedGroup
    }))
    .catch(() => res.status(500).send());
  });
};

export const deleteGroup = (req, res) => {
  Group.findById(req.params.groupid).then((group) => {
    if (req.currentUser.username !== group.createdBy) {
      return res.status(401).send({
        error: 'You can only delete groups created by you'
      });
    }
    group.destroy().then(() => res.status(201).send({
      message: 'Group successfully deleted'
    }));
  });
};
