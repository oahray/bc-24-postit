import expect from 'expect';
import request from 'supertest';
import socketIo from 'socket.io-client';

import app from '../../app';
import '../../bin/www';
import { Group } from '../../models';
import { transporter } from '../../config/nodemailer';
import { seedUsers, seedGroups, tokens } from '../seeders/seed';

const socket = socketIo('http://localhost');

describe('/api/v1/group route', () => {
  it('requires group name', (done) => {
    request(app)
      .post('/api/v1/group')
      .set('x-auth', tokens[0])
      .send({
        description: 'This group has no name',
        type: 'public'
      })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.error).toExist().toBe('Group name is required.');
        done();
      });
  });

  it('returns error for group name longer than 20 characters', (done) => {
    request(app)
      .post('/api/v1/group')
      .set('x-auth', tokens[0])
      .send({
        name: 'This is an extremely long group name',
        description: 'This group has no name',
        type: 'public'
      })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.error).toExist().toBe('Group name too long');
        done();
      });
  });

  it('returns error for group description longer than 180 characters',
  (done) => {
    request(app)
      .post('/api/v1/group')
      .set('x-auth', tokens[0])
      .send({
        name: 'sample group',
        description: `This group description is just so long
        that it would definitely generate an error from the
        server. It is obviously longer than 180 characters
        and should fail the lenght validation. This is the
        reason it is being used here at all.`,
        type: 'public'
      })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.error).toExist().toBe('Group description too long');
        done();
      });
  });

  it('sets group type to public if private is not specified', (done) => {
    request(app)
      .post('/api/v1/group')
      .set('x-auth', tokens[2])
      .send({
        name: 'This group is named',
        description: 'But that is the name',
      })
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toExist().toBe('Group created');
        done();
      });
  });

  it('returns error for duplicate group name', (done) => {
    request(app)
      .post('/api/v1/group')
      .set('x-auth', tokens[2])
      .send({
        name: 'This group is named',
        description: 'Just so you know',
        type: 'Pub'
      })
      .expect(409)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.error).toExist()
          .toBe('You already have a group with this name');
        done();
      });
  });
});

describe('POST /api/v1/:groupid/user', () => {
  it('should allow users add other users to groups', (done) => {
    const usernameToAdd = seedUsers.registered[0].username;
    const groupId = seedGroups[0].id;
    request(app)
      .post(`/api/v1/group/${groupId}/user`)
      .set('x-auth', tokens[2])
      .send({
        username: usernameToAdd
      })
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        socket.on('Added to group', (data) => {
          expect(data.user.name).toBe(usernameToAdd);
          expect(data.group.id).toBe(groupId);
        });
        expect(res.body.message).toBe(`${usernameToAdd} added to group`);
        request(app)
          .delete(`/api/v1/group/${groupId}/user`)
          .set('x-auth', tokens[2])
          .send({
            username: usernameToAdd
          })
          .expect(201)
          .end((err, res) => {
            expect(res.body.message)
              .toBe(`${usernameToAdd} removed from group`);
            done();
          });
      });
  });

  it('returns 400 on non-existent username', (done) => {
    const usernameToAdd = '123';
    const groupId = seedGroups[0].id;
    request(app)
      .post(`/api/v1/group/${groupId}/user`)
      .set('x-auth', tokens[2])
      .send({
        username: usernameToAdd
      })
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.error).toBe('User does not exist with that username');
        done();
      });
  });

  it('returns 409 on user already in group', (done) => {
    const usernameToAdd = seedUsers.registered[2].username;
    const groupId = seedGroups[0].id;
    request(app)
      .post(`/api/v1/group/${groupId}/user`)
      .set('x-auth', tokens[2])
      .send({
        username: usernameToAdd
      })
      .expect(409)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.error).toBe(`${usernameToAdd} already in group`);
        done();
      });
  });
});

describe('DELETE /api/v1/group/:groupid/user route', () => {
  it('does not allow a user who is not the group creator, remove users',
  (done) => {
    const user3Token = tokens[2];
    const user1Token = tokens[0];
    const groupId = seedGroups[2].id;
    request(app)
      .post(`/api/v1/group/${seedGroups[2].id}/user`)
      .set('x-auth', user3Token)
      .send({
        username: seedUsers.registered[0].username
      })
      .expect(201)
      .end(() => {
        request(app)
          .delete(`/api/v1/group/${groupId}/user`)
          .set('x-auth', user1Token)
          .send({
            username: seedUsers.registered[1].username
          })
          .expect(403)
          .end((err, res) => {
            expect(res.body.error)
              .toBe('Only a group creator can remove members');
            done();
          });
      });
  });

  it('returns error when the user to be removed is not a member of the group',
  (done) => {
    const user3Token = tokens[2];
    const groupId = seedGroups[2].id;
    request(app)
      .post(`/api/v1/group/${seedGroups[2].id}/user`)
      .set('x-auth', user3Token)
      .send({
        username: seedUsers.registered[0].username
      })
      .expect(201)
      .end(() => {
        request(app)
          .delete(`/api/v1/group/${groupId}/user`)
          .set('x-auth', user3Token)
          .send({
            username: seedUsers.unregistered[0].username
          })
          .expect(404)
          .end((err, res) => {
            expect(res.body.error).toBe('No such user in specified group');
            done();
          });
      });
  });

  it('does not remove current user', (done) => {
    const user3Token = tokens[2];
    const groupId = seedGroups[2].id;
    request(app)
      .delete(`/api/v1/group/${groupId}/user`)
      .set('x-auth', user3Token)
      .send({
        username: seedUsers.registered[2].username
      })
      .expect(401)
      .end((err, res) => {
        expect(res.body.error).toBe(
          'You cannot remove yourself from a group. Leave instead'
        );
        done();
      });
  });
});

describe('POST /api/v1/group/:groupid/leave', () => {
  it('allows a user leave group', (done) => {
    const user3Token = tokens[2];
    const user1Token = tokens[0];
    const groupId = seedGroups[2].id;
    request(app)
      .post(`/api/v1/group/${seedGroups[2].id}/user`)
      .set('x-auth', user3Token)
      .send({
        username: seedUsers.registered[0].username
      })
      .expect(201)
      .end(() => {
        request(app)
          .post(`/api/v1/group/${groupId}/leave`)
          .set('x-auth', user1Token)
          .expect(201)
          .end((err, res) => {
            expect(res.body.message)
              .toBe(`You left ${seedGroups[2].name.toUpperCase()}`);
            request(app)
              .post(`/api/v1/group/${groupId}/leave`)
              .set('x-auth', user3Token)
              .expect(201)
              .end((err, res) => {
                expect(res.body.message)
                  .toBe(`You left, and ${seedGroups[2]
                    .name.toUpperCase()} has been deleted`);
                done();
              });
          });
      });
  });
});

describe('GET /api/v1/group/:groupid/users', () => {
  it('should return list of group users if search query is not provided',
  (done) => {
    const groupId = seedGroups[0].id;
    request(app)
      .get(`/api/v1/group/${groupId}/users`)
      .set('x-auth', tokens[2])
      .expect(200)
      .end((err, res) => {
        expect(res.body.groupUsers).toExist;
        done();
      });
  });

  it(`should return list of all users not in group if
  members is set to false and nothing else is specified`, (done) => {
    const groupId = seedGroups[0].id;
    request(app)
      .get(`/api/v1/group/${groupId}/users?members=false`)
      .set('x-auth', tokens[2])
      .expect(200)
      .end((err, res) => {
        expect(res.body.page).toBe(1);
        expect(res.body.pageCount).toExist();
        expect(res.body.pageSize).toExist();
        expect(res.body.totalCount).toExist();
        expect(res.body.users).toExist();
        done();
      });
  });

  it('should return results based on limit and offset values in query',
  (done) => {
    const groupId = seedGroups[0].id;
    request(app)
      .get(`/api/v1/group/${groupId}/users?members=false&u=u&limit=10&offset=1`)
      .set('x-auth', tokens[2])
      .expect(200)
      .end((err, res) => {
        expect(res.body.page).toBe(2);
        expect(res.body.pageCount).toExist();
        expect(res.body.pageSize).toExist();
        expect(res.body.totalCount).toExist();
        expect(res.body.users).toExist();
        done();
      });
  });
});

describe('POST /api/v1/group/:groupid/message', () => {
  it('should return error if message content is not provided', (done) => {
    const groupId = seedGroups[0].id;
    request(app)
      .post(`/api/v1/group/${groupId}/message`)
      .set('x-auth', tokens[2])
      .expect(400)
      .end((err, res) => {
        expect(res.body.error).toBe('Message must not be empty');
        done();
      });
  });

  it('should return error if message priority is set but incorrect', (done) => {
    const groupId = seedGroups[0].id;
    request(app)
      .post(`/api/v1/group/${groupId}/message`)
      .send({
        content: 'First message',
        priority: 'dunno'
      })
      .set('x-auth', tokens[2])
      .expect(400)
      .end((err, res) => {
        expect(res.body.error).toBe(
          'Incorrect priority option. Choose NORMAL, URGENT or CRITICAL.'
        );
        done();
      });
  });

  it(`should send message to group, and set priority
  to normal if none supplied`,
  (done) => {
    const groupId = seedGroups[0].id;
    request(app)
      .post(`/api/v1/group/${groupId}/message`)
      .send({
        content: 'First message'
      })
      .set('x-auth', tokens[2])
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        socket.on('Message posted', (data) => {
          expect(data.message.sender).toExist()
            .toBe(seedUsers.registered[2].username);
          expect(data.group.id).toExist().toBe(seedGroups[0].id);
        });
        expect(res.body.sent).toExist();
        expect(res.body.sent.content).toBe('First message');
        done();
      });
  });

  it('should send email notification if priority is urgent or critical',
  (done) => {
    transporter.sendMail = () => Promise.resolve(1);
    const groupId = seedGroups[0].id;
    Group.findById(groupId)
      .then((group) => {
        group.addUser(seedUsers.registered[1].id)
          .then(() => {
            request(app)
              .post(`/api/v1/group/${groupId}/message`)
              .send({
                content: 'Second message',
                priority: 'urgent'
              })
              .set('x-auth', tokens[2])
              .expect(201)
              .end((err, res) => {
                if (err) {
                  return done(err);
                }
                socket.on('Message posted', (data) => {
                  expect(data.message.sender).toExist()
                    .toBe(seedUsers.registered[2].username);
                  expect(data.group.id).toExist().toBe(seedGroups[0].id);
                });
                expect(res.body.sent).toExist();
                expect(res.body.sent.content).toBe('Second message');
                done();
              });
          });
      });
  });
});

describe('GET /api/v1/group/:groupid/messages', () => {
  it('should get group messages', (done) => {
    const groupId = seedGroups[0].id;
    request(app)
      .get(`/api/v1/group/${groupId}/messages`)
      .set('x-auth', tokens[2])
      .expect(200)
      .end((err, res) => {
        expect(res.body.messages).toExist();
        expect(res.body.messages.length).toBe(2);
        done();
      });
  });
});

describe('GET /api/v1/group/:groupid/messages/read', () => {
  it('should return error if message id invalid', (done) => {
    const groupId = seedGroups[0].id;
    request(app)
      .post(`/api/v1/group/${groupId}/message/hey/read`)
      .set('x-auth', tokens[2])
      .expect(400)
      .end((err, res) => {
        expect(res.body.error).toExist();
        expect(res.body.error).toBe('Valid message id is required');
        done();
      });
  });

  it('should mark messages as read', (done) => {
    const groupId = seedGroups[0].id;
    request(app)
      .post(`/api/v1/group/${groupId}/message/1/read`)
      .set('x-auth', tokens[2])
      .expect(201)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.update).toExist();
        expect(res.body.update.readBy.split(','))
          .toInclude(seedUsers.registered[2].username);
        done();
      });
  });
});

describe('PATCH /api/v1/group/:groupid/info', () => {
  it('should return error if group name not supplied', (done) => {
    request(app)
      .patch(`/api/v1/group/${seedGroups[0].id}/info`)
      .set('x-auth', tokens[2])
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.error).toBe('Group name is required');
        done();
      });
  });

  it('should return error if group name is longer than 25 characters',
  (done) => {
    request(app)
      .patch(`/api/v1/group/${seedGroups[0].id}/info`)
      .set('x-auth', tokens[2])
      .send({ name: 'this is an extremely long group name' })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.error).toBe('Group name too long');
        done();
      });
  });

  it('should return error if group description is longer than 160 characters',
  (done) => {
    request(app)
      .patch(`/api/v1/group/${seedGroups[0].id}/info`)
      .set('x-auth', tokens[2])
      .send({ name: 'my group name',
        description: `This group description is just so long
        that it would definitely generate an error from the
        server. It is obviously longer than 180 characters
        and should fail the lenght validation. This is the
        reason it is being used here at all. ` })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.error).toBe('Group description too long');
        done();
      });
  });

  it('should update group info', (done) => {
    request(app)
      .patch(`/api/v1/group/${seedGroups[0].id}/info`)
      .set('x-auth', tokens[2])
      .send({
        name: 'Better name for group',
        type: 'private'
      })
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Group info successfully updated');
        done();
      });
  });
});

describe('POST /api/v1/group/:groupid/remove', () => {
  it('should not let non-creator user delete group', (done) => {
    const usernameToAdd = seedUsers.registered[0].username;
    const groupId = seedGroups[0].id;
    request(app)
      .post(`/api/v1/group/${groupId}/user`)
      .set('x-auth', tokens[2])
      .send({
        username: usernameToAdd
      })
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe(`${usernameToAdd} added to group`);
        request(app)
          .post(`/api/v1/group/${groupId}/remove`)
          .set('x-auth', tokens[0])
          .expect(403)
          .end((err, res) => {
            expect(res.body.error)
            .toBe('You can only delete groups created by you');
            done();
          });
      });
  });

  it('should let group creator successfully delete group', (done) => {
    const groupId = seedGroups[0].id;
    request(app)
      .post(`/api/v1/group/${groupId}/remove`)
      .set('x-auth', tokens[2])
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Group successfully deleted');
        done();
      });
  });
});
