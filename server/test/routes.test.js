import expect from 'expect';
import request from 'supertest';
import io from 'socket.io-client';

import app from '../app';
import '../bin/www';
import { Group, User } from '../models';
import { transporter } from '../config/nodemailer'
import { doBeforeAll, doBeforeEach, populateUsers } from './seeders/testHooks';
import { seedUsers, seedGroups, tokens, generateAuth } from './seeders/seed';

const socket = io('http://localhost');

describe('PostIt API routes: ', () => {
  doBeforeAll();
  describe('Can signup or signin user: ', () => {
    it('POST /api/v1/user/signup route should create a new user', (done) => {
      request(app)
        .post('/api/v1/user/signup')
        .send({
          username: 'testuser1',
          email: 'testuser1@example.com',
          password: 'mypassword',
        })
        .expect(201)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.user.id).toExist;
          expect(res.body.user.username).toBe('testuser1');
          expect(res.body.user.email).toBe('testuser1@example.com');
          done();
        });
    });
    it('POST /api/v1/user/signup route should not pass back user password with response', (done) => {
      request(app)
        .post('/api/v1/user/signup')
        .send({
          username: 'testuser2',
          email: 'testuser2@example.com',
          password: 'mypassword',
        })
        .expect(201)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.user.username).toBe('testuser2');
          expect(res.body.user.password).toNotExist;
          done();
        });
    });
    it('POST /api/v1/user/signup route should not create user with same username twice', (done) => {
      request(app)
        .post('/api/v1/user/signup')
        .send({
          username: 'testuser2',
          email: 'testuser3@example.com',
          password: 'mypassword',
        })
        .expect(400)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.user).toNotExist;
          expect(res.body.error).toBe("Username already taken.")
          done();
        });
    });
    it('POST /api/v1/user/signup route should not create user with same username twice', (done) => {
      request(app)
        .post('/api/v1/user/signup')
        .send({
          username: 'testuser3',
          email: 'testuser2@example.com',
          password: 'mypassword',
        })
        .expect(400)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.user).toNotExist;
          expect(res.body.error).toBe("Email already taken.")
          done();
        });
    });
    it('POST /api/v1/user/signin route should sign user in', (done) => {
      request(app)
        .post('/api/v1/user/signin')
        .send({
          username: 'testuser1',
          password: 'mypassword',
        })
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.user.username).toBe('testuser1');
          expect(res.body.user.id).toExist;
          done();
        });
    });
    it('POST /api/v1/user/signin route should not sign user with unregistered username', (done) => {
      request(app)
        .post('/api/v1/user/signin')
        .send({
          username: 'thisOneDoesNotExist',
          password: 'doesNotMatter'
        })
        .expect(401)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.user).toNotExist;
          expect(res.body.error).toBe('Username/Password is incorrect');
          done();
        });
    });
    it('POST /api/v1/user/signin route should not sign user in with incorrect password', (done) => {
      request(app)
        .post('/api/v1/user/signin')
        .send({
          username: 'testuser1',
          password: 'mypasswor',
        })
        .expect(401)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.user).toNotExist;
          expect(res.body.error).toBe("Username/Password is incorrect");
          done();
        });
    });
    it('POST /api/v1/user/signin route should not pass back user password with response', (done) => {
      request(app)
        .post('/api/v1/user/signin')
        .send({
          username: 'testuser2',
          email: 'testuser2@example.com',
          password: 'mypassword',
        })
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.user.username).toBe('testuser2');
          expect(res.body.user.password).toNotExist;
          done();
        });
    });

    it('POST /api/v1/user/signin route should return error if no password entered', (done) => {
      request(app)
        .post('/api/v1/user/signin')
        .send({
          username: 'testuser2'
        })
        .expect(400)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.error).toExist().toBe('Password must not be empty');
          done();
        });
    });
  });

  describe('Protected User routes', () => {
    const token = generateAuth(103);
    it('GET /api/v1/user/me route should return current user', (done) => {
      request(app)
        .get('/api/v1/user/me')
        .set('x-auth', token)
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.currentUser.username).toBe('user113');
          expect(res.body.currentUser.password).toNotExist;
          done();
        });
    });

    it('GET /api/v1/users route should get a list of all users', (done) => {
      request(app)
        .get('/api/v1/user/all')
        .set('x-auth', generateAuth(103))
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.users).toBeAn('object');
          expect(Array.isArray(res.body.users)).toBe(true);
          expect(res.body.users.length).toBeGreaterThanOrEqualTo(3);
          expect(res.body.users).toExist;
          done();
        });
    });

    it('GET /api/v1/user/me/groups should get user groups', (done) => {
      const token = generateAuth(seedUsers.registered[2].id)
      request(app)
        .get('/api/v1/user/me/groups')
        .set('x-auth', token)
        .expect(200)
        .end((err, res) => {
          expect(res.body.userGroups.length).toBe(3);
          done();
        });
    });

    it('GET /api/v1/user/me/groups should get user messages', (done) => {
      const token = generateAuth(seedUsers.registered[2].id)
      request(app)
        .get('/api/v1/user/me/messages')
        .set('x-auth', token)
        .expect(200)
        .end((err, res) => {
          expect(res.body.messages).toExist;
          done();
        });
    });

    it('PATCH /api/v1/user/me/password route should return 400 if current password is not supplied', (done) => {
      const token = generateAuth(seedUsers.registered[1].id)
      request(app)
        .patch('/api/v1/user/me/password')
        .set('x-auth', token)
        .send({
          newpassword: 'changedThis'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.error).toBe('Current password required');
          done();
        });
    });

    it('PATCH /api/v1/user/me/password route should return 400 if new password is not supplied', (done) => {
      const token = generateAuth(seedUsers.registered[1].id)
      request(app)
        .patch('/api/v1/user/me/password')
        .set('x-auth', token)
        .send({
          currentpassword: seedUsers.registered[1].password
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.error).toBe('New password required');
          done();
        });
    });

    it('PATCH /api/v1/user/me/password route should return 400 if current password is incorrect', (done) => {
      const token = generateAuth(seedUsers.registered[1].id)
      request(app)
        .patch('/api/v1/user/me/password')
        .set('x-auth', token)
        .send({
          currentpassword: 'cannotRemember',
          newpassword: 'changedThis'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.error).toBe('Password is incorrect');
          done();
        });
    });

    it('PATCH /api/v1/user/me/password route should return 400 if current password is incorrect', (done) => {
      const token = generateAuth(seedUsers.registered[1].id)
      request(app)
        .patch('/api/v1/user/me/password')
        .set('x-auth', token)
        .send({
          currentpassword: seedUsers.registered[1].password,
          newpassword: seedUsers.registered[1].password,
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.error).toBe('New password is the same as current');
          done();
        });
    });

    it('PATCH /api/v1/user/me/password route should successfully update password', (done) => {
      const token = generateAuth(seedUsers.registered[1].id)
      request(app)
        .patch('/api/v1/user/me/password')
        .set('x-auth', token)
        .send({
          currentpassword: seedUsers.registered[1].password,
          newpassword: 'changedThis'
        })
        .expect(201)
        .end((err, res) => {
          expect(res.body.message).toBe('Password successfully updated');
          done();
        });
    });

    it('PATCH /api/v1/user/me/edit route should return error when email is empty', (done) => {
      const token = generateAuth(seedUsers.registered[1].id)
      request(app)
        .patch('/api/v1/user/me/edit')
        .set('x-auth', token)
        .send({
          about: 'Awesome me'
        })
        .expect(400)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          expect(res.body.error).toBe('Email is required');
          done();
        });
    });

    it('PATCH /api/v1/user/me/password route should successfully update profile', (done) => {
      const token = generateAuth(seedUsers.registered[1].id);
      const email = 'updatedemail@example.com';
      request(app)
        .patch('/api/v1/user/me/edit')
        .set('x-auth', token)
        .send({
          email
        })
        .expect(201)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          expect(res.body.message).toBe('Profile successfully updated');
          expect(res.body.profile.email).toBe(email);
          done();
        });
    });
  });

  describe('Recovery routes:', () => {
    doBeforeAll();
    describe('POST /api/v1/forgotpassword route', () => {
      it('should return error if no recovery email is provided', (done) => {
        request(app)
          .post('/api/v1/forgotpassword')
          .expect(400)
          .end((err, res) => {
            expect(res.body.error).toBe('Email is required for password recovery')
            done();
          });
      });

      it('should return error if no valid recovery email is provided', (done) => {
        request(app)
          .post('/api/v1/forgotpassword')
          .send({
            email: 'some email'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body.error).toBe('Incorrect email')
            done();
          });
      })

      it('should send reset email', (done) => {
        transporter.sendMail = () => Promise.resolve(1);
        const email = seedUsers.registered[1].email;
        request(app)
          .post('/api/v1/forgotpassword')
          .send({
            email
          })
          .expect(200)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(res.body.message).toBe(`An email with reset instructions has been sent to ${email}`);
            done();
          })
      });
    });

    describe('POST /api/v1/resetpassword route', () => {
      it('should return error if no reset hash is provided', (done) => {
        request(app)
          .post(`/api/v1/resetpassword?`)
          .send({
            password: 'newPassword'
          })
          .expect(400)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(res.body.error).toBe('Invalid reset link.');
            done();
          });
      });

      it('should return error if no password is provided', (done) => {
        request(app)
          .post(`/api/v1/resetpassword?t=fjdhstjdfkgjlhklk`)
          .send({
            password: ''
          })
          .expect(400)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(res.body.error).toBe('Password is required!');
            done();
          });
      });

      it('should return error if reset link is invalid', (done) => {
        request(app)
          .post(`/api/v1/resetpassword?t=somerandomstuff`)
          .send({
            password: 'somepassword'
          })
          .expect(401)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(res.body.error).toBe('Link cannot be validated.');
            done();
          });
      });

      it('should return error if reset link has expired', (done) => {
        request(app)
          .post(`/api/v1/resetpassword?t=${seedUsers.registered[3].resetHash}`)
          .send({
            password: 'somepassword'
          })
          .expect(401)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(res.body.error).toBe('Reset link has expired.');
            done();
          });
      });

      it('should successfully reset password with valid authentication', (done) => {
        request(app)
          .post(`/api/v1/resetpassword?t=${seedUsers.registered[4].resetHash}`)
          .send({
            password: 'myNewPassword'
          })
          .expect(201)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(res.body.message).toBe('Your password has been successfully updated.');
            done();
          });
      });

    });
  });

  describe('Group routes:', () => {
    const token = generateAuth(seedUsers.registered[0].id);
    describe('', () => {
      it('/api/v1/group route requires group name', (done) => {
        request(app)
          .post('/api/v1/group')
          .set('x-auth', token)
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
            done()
          });
      });

      it('/api/v1/group route requires group name', (done) => {
        request(app)
          .post('/api/v1/group')
          .set('x-auth', token)
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
            done()
          });
      });

      it('/api/v1/group route requires group name', (done) => {
        request(app)
          .post('/api/v1/group')
          .set('x-auth', token)
          .send({
            name: 'sample group',
            description: 'This group description is super long and does absolutely nothing to even describe the said group',
            type: 'public'
          })
          .expect(400)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(res.body.error).toExist().toBe('Group description too long');
            done()
          });
      });

      it('/api/v1/group route sets group type to public if private is not specified', (done) => {
        const token = generateAuth(seedUsers.registered[2].id);
        request(app)
          .post('/api/v1/group')
          .set('x-auth', token)
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
            done()
          });
      });

      it('/api/v1/group route returns error for duplicate group name', (done) => {
        const token = generateAuth(seedUsers.registered[2].id);
        request(app)
          .post('/api/v1/group')
          .set('x-auth', token)
          .send({
            name: 'This group is named',
            description: 'Just so you know',
            type: 'Pub'
          })
          .expect(400)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(res.body.error).toExist().toBe('You already have a group with this name');
            done()
          });
      });
    });

    it('Some can add and remove user from groups, or leave groups', (done) => {
      const token = generateAuth(seedUsers.registered[2].id);
      const usernameToAdd = seedUsers.registered[0].username;
      const groupId = seedGroups[0].id;
      request(app)
        .post(`/api/v1/group/${groupId}/user`)
        .set('x-auth', token)
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
            .set('x-auth', token)
            .send({
              username: usernameToAdd
            })
            .expect(201)
            .end((err, res) => {
              expect(res.body.message).toBe(`${usernameToAdd} removed from group`);
              done();
            })
        });
    });

    it('POST /api/v1/group/:groupid/user returns 400 on non-existent username', (done) => {
      const token = generateAuth(seedUsers.registered[2].id);
      const usernameToAdd = '123';
      const groupId = seedGroups[0].id;
      request(app)
        .post(`/api/v1/group/${groupId}/user`)
        .set('x-auth', token)
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

    it('POST /api/v1/group/:groupid/user returns 400 on user already in group', (done) => {
      const token = generateAuth(seedUsers.registered[2].id);
      const usernameToAdd = seedUsers.registered[2].username;
      const groupId = seedGroups[0].id;
      request(app)
        .post(`/api/v1/group/${groupId}/user`)
        .set('x-auth', token)
        .send({
          username: usernameToAdd
        })
        .expect(400)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.error).toBe(`${usernameToAdd} already in group`);
          done();
        });
    });

    it('DELETE /api/v1/group/:groupid/user only allows group creator remove users', (done) => {
      const user3Token = generateAuth(seedUsers.registered[2].id);
      const user1Token = generateAuth(seedUsers.registered[0].id)
      const groupId = seedGroups[2].id;
      request(app)
        .post(`/api/v1/group/${seedGroups[2].id}/user`)
        .set('x-auth', user3Token)
        .send({
          username: seedUsers.registered[0].username
        })
        .expect(201)
        .end((err, res) => {
          request(app)
            .delete(`/api/v1/group/${groupId}/user`)
            .set('x-auth', user1Token)
            .send({
              username: seedUsers.registered[1].username
            })
            .expect(401)
            .end((err, res) => {
              expect(res.body.error).toBe('Only a group creator can remove members');
              done();
            });
        });
    });

    it('DELETE /api/v1/group/:groupid/user does not work with non-members', (done) => {
      const user3Token = generateAuth(seedUsers.registered[2].id);
      const user1Token = generateAuth(seedUsers.registered[0].id)
      const groupId = seedGroups[2].id;
      request(app)
        .post(`/api/v1/group/${seedGroups[2].id}/user`)
        .set('x-auth', user3Token)
        .send({
          username: seedUsers.registered[0].username
        })
        .expect(201)
        .end((err, res) => {
          request(app)
            .delete(`/api/v1/group/${groupId}/user`)
            .set('x-auth', user3Token)
            .send({
              username: seedUsers.unregistered[0].username
            })
            .expect(401)
            .end((err, res) => {
              expect(res.body.error).toBe('No such user in specified group');
              done();
            });
        });
    });

    it('DELETE /api/v1/group/:groupid/user route does not remove current user', (done) => {
      const user3Token = generateAuth(seedUsers.registered[2].id);
      const groupId = seedGroups[2].id;
      request(app)
        .delete(`/api/v1/group/${groupId}/user`)
        .set('x-auth', user3Token)
        .send({
          username: seedUsers.registered[2].username
        })
        .expect(401)
        .end((err, res) => {
          expect(res.body.error).toBe('You cannot remove yourself from a group. Leave instead');
          done();
        });
    });

    it('POST /api/v1/group/:groupid/leave allows a user leave group', (done) => {
      const user3Token = generateAuth(seedUsers.registered[2].id);
      const user1Token = generateAuth(seedUsers.registered[0].id)
      const groupId = seedGroups[2].id;
      request(app)
        .post(`/api/v1/group/${seedGroups[2].id}/user`)
        .set('x-auth', user3Token)
        .send({
          username: seedUsers.registered[0].username
        })
        .expect(201)
        .end((err, res) => {
          request(app)
            .post(`/api/v1/group/${groupId}/leave`)
            .set('x-auth', user1Token)
            .expect(201)
            .end((err, res) => {
              expect(res.body.message).toBe(`You left ${seedGroups[2].name.toUpperCase()}`);
              request(app)
                .post(`/api/v1/group/${groupId}/leave`)
                .set('x-auth', user3Token)
                .expect(201)
                .end((err, res) => {
                  expect(res.body.message).toBe(`You left, and ${seedGroups[2].name.toUpperCase()} has been deleted`);
                  done();
                });
            });
        });
    });

    it('GET /api/v1/group/:groupid/users should return list of group users', (done) => {
      const groupId = seedGroups[0].id
      request(app)
        .get(`/api/v1/group/${groupId}/users`)
        .set('x-auth', generateAuth(seedUsers.registered[2].id))
        .expect(200)
        .end((err, res) => {
          expect(res.body.groupUsers).toExist;
          done();
        })
    });

    it('GET /api/v1/group/:groupid/users?members=false should return list of all users not in group if search query is not provided', (done) => {
      const groupId = seedGroups[0].id
      request(app)
        .get(`/api/v1/group/${groupId}/users?members=false`)
        .set('x-auth', generateAuth(seedUsers.registered[2].id))
        .expect(200)
        .end((err, res) => {
          expect(res.body.page).toBe(1);
          expect(res.body.pageCount).toExist;
          expect(res.body.pageSize).toExist;
          expect(res.body.totalCount).toExist;
          expect(res.body.users).toExist;
          done();
        })
    });

    it('GET /api/v1/group/:groupid/users?members=false should return results based on query', (done) => {
      const groupId = seedGroups[0].id
      request(app)
        .get(`/api/v1/group/${groupId}/users?members=false&u=u&limit=10&offset=1`)
        .set('x-auth', generateAuth(seedUsers.registered[2].id))
        .expect(200)
        .end((err, res) => {
          expect(res.body.page).toBe(2);
          expect(res.body.pageCount).toExist;
          expect(res.body.pageSize).toExist;
          expect(res.body.totalCount).toExist;
          expect(res.body.users).toExist;
          done();
        })
    });

    it('POST /api/v1/group/:groupid/message should return error if message content is not provided', (done) => {
      const groupId = seedGroups[0].id
      request(app)
        .post(`/api/v1/group/${groupId}/message`)
        .set('x-auth', generateAuth(seedUsers.registered[2].id))
        .expect(400)
        .end((err, res) => {
          expect(res.body.error).toBe('Message must not be empty');
          done();
        })
    });

    it('POST /api/v1/group/:groupid/message should return error if message priority is set but incorrect', (done) => {
      const groupId = seedGroups[0].id
      request(app)
        .post(`/api/v1/group/${groupId}/message`)
        .send({
          content: 'First message',
          priority: 'dunno'
        })
        .set('x-auth', generateAuth(seedUsers.registered[2].id))
        .expect(400)
        .end((err, res) => {
          expect(res.body.error).toBe('Incorrect priority option. Choose NORMAL, URGENT or CRITICAL.');
          done();
        })
    });

    it('POST /api/v1/group/:groupid/message should send message to group, and set priority to normal if none supplied', (done) => {
      const groupId = seedGroups[0].id
      request(app)
        .post(`/api/v1/group/${groupId}/message`)
        .send({
          content: 'First message'
        })
        .set('x-auth', generateAuth(seedUsers.registered[2].id))
        .expect(201)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          socket.on('Message posted', (data) => {
            expect(data.message.sender).toExist().toBe(seedUsers.registered[2].username);
            expect(data.group.id).toExist().toBe(seedGroups[0].id);
          });
          expect(res.body.sent).toExist;
          expect(res.body.sent.content).toBe('First message');
          done();
        })
    });

    it('POST /api/v1/group/:groupid/message should send email notification if priority is urgent or critical', (done) => {
      transporter.sendMail = () => Promise.resolve(1);
      const groupId = seedGroups[0].id
      Group.findById(groupId)
        .then((group) => {
          return group.addUser(seedUsers.registered[1].id)
            .then(() => {
              request(app)
                .post(`/api/v1/group/${groupId}/message`)
                .send({
                  content: 'Second message',
                  priority: 'urgent'
                })
                .set('x-auth', generateAuth(seedUsers.registered[2].id))
                .expect(201)
                .end((err, res) => {
                  if (err) {
                    return done(err);
                  }
                  socket.on('Message posted', (data) => {
                    expect(data.message.sender).toExist().toBe(seedUsers.registered[2].username);
                    expect(data.group.id).toExist().toBe(seedGroups[0].id);
                  });
                  expect(res.body.sent).toExist;
                  expect(res.body.sent.content).toBe('Second message');
                  done();
                })
            });
        });
    });

    it('GET /api/v1/group/:groupid/messages should get group messages', (done) => {
      const groupId = seedGroups[0].id
      request(app)
        .get(`/api/v1/group/${groupId}/messages`)
        .set('x-auth', generateAuth(seedUsers.registered[2].id))
        .expect(200)
        .end((err, res) => {
          expect(res.body.messages).toExist;
          expect(res.body.messages.length).toBe(2);
          done();
        })
    });

    it('POST /api/v1/group/:groupid/remove should not let non-creator user delete group', (done) => {
      const token = generateAuth(seedUsers.registered[2].id);
      const usernameToAdd = seedUsers.registered[0].username;
      const groupId = seedGroups[0].id;
      request(app)
        .post(`/api/v1/group/${groupId}/user`)
        .set('x-auth', token)
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
            .set('x-auth', generateAuth(seedUsers.registered[0].id))
            .expect(401)
            .end((err, res) => {
              expect(res.body.error).toBe('You can only delete groups created by you');
              done();
            })
        });
    });

    it('GET /api/v1/group/:groupid/message/:messageid/read should return error if message id invalid', (done) => {
      const groupId = seedGroups[0].id
      request(app)
        .post(`/api/v1/group/${groupId}/message/hey/read`)
        .set('x-auth', generateAuth(seedUsers.registered[2].id))
        .expect(400)
        .end((err, res) => {
          expect(res.body.error).toExist;
          expect(res.body.error).toBe('Valid message id is required');
          done();
        })
    });

    it('GET /api/v1/group/:groupid/message/:messageid/read should mark messages as read', (done) => {
      const groupId = seedGroups[0].id
      request(app)
        .post(`/api/v1/group/${groupId}/message/1/read`)
        .set('x-auth', generateAuth(seedUsers.registered[0].id))
        .expect(201)
        .end((err, res) => {
          if (err)
            expect(res.body.update).toExist;
          expect(res.body.update.readBy.split(',')).toInclude(seedUsers.registered[0].username);
          done();
        })
    });

    it('PATCH /api/v1/group/:groupid/info should return error if group name not supplied', (done) => {
      request(app)
        .patch(`/api/v1/group/${seedGroups[0].id}/info`)
        .set('x-auth', generateAuth(seedUsers.registered[0].id))
        .expect(400)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.error).toBe('Group name is required');
          done();
        })
    });

    it('PATCH /api/v1/group/:groupid/info should update group info', (done) => {
      request(app)
        .patch(`/api/v1/group/${seedGroups[0].id}/info`)
        .set('x-auth', generateAuth(seedUsers.registered[0].id))
        .send({
          name: "Better name for group",
          type: 'private'
        })
        .expect(201)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('Group info successfully updated');
          done();
        })
    });

    it('POST /api/v1/group/:groupid/remove should let group creator successfully delete group', (done) => {
      const groupId = seedGroups[0].id
      request(app)
        .post(`/api/v1/group/${groupId}/remove`)
        .set('x-auth', generateAuth(seedUsers.registered[2].id))
        .expect(201)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('Group successfully deleted');
          done();
        })
    });
  });

  describe('Catch blocks', () => {
    it('POST /api/v1/group/:groupid/remove should return 500 error for server failure to delete group', (done) => {
      Group.prototype.destroy = () => Promise.reject(1);
      const groupId = seedGroups[1].id;
      request(app)
        .post(`/api/v1/group/${groupId}/remove`)
        .set('x-auth', generateAuth(seedUsers.registered[2].id))
        .expect(500)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.error).toBe('Internal server error');
          done();
        })
    });

    it('should return 500 for recovery email not sent', (done) => {
      transporter.sendMail = () => Promise.reject(1);
      const email = seedUsers.registered[1].email;
      request(app)
        .post('/api/v1/forgotpassword')
        .send({
          email
        })
        .expect(500)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.error).toBe('Error sending recovery mail. Please try again later');
          done();
        })
    });

    it('should return 500 for recovery email not sent', (done) => {
      User.prototype.update = () => Promise.reject(1);
      const email = seedUsers.registered[1].email;
      request(app)
        .post('/api/v1/forgotpassword')
        .send({
          email
        })
        .expect(500)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.error).toBe('Internal server error');
          done();
        })
    });

    it('POST /api/v1/user/signup route should create a new user', (done) => {
      User.create = () => Promise.reject(1);
      request(app)
        .post('/api/v1/user/signup')
        .send({
          username: 'testingguy',
          email: 'testuser1@example.com',
          password: 'mypassword',
        })
        .expect(500)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.error).toExist().toBe('Internal server error');
          done();
        });
    });

    describe('isGroupMember middleware', () => {
      it('should send 500 error when server fails', (done) => {
        Group.findById = () => Promise.reject(1);
        request(app)
          .patch(`/api/v1/group/${seedGroups[0].id}/info`)
          .set('x-auth', generateAuth(seedUsers.registered[0].id))
          .send({
            name: "Better name for group",
            type: 'private'
          })
          .expect(500)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(res.body.error).toBe('Internal server error');
            done();
          });
      });
    });

    // it('POST /api/v1/group/:groupid/message should...', (done) => {
    //   transporter.sendMail = () => Promise.reject(1);
    //   const groupId = seedGroups[1].id
    //   request(app)
    //     .post(`/api/v1/group/${groupId}/message`)
    //     .send({
    //       content: 'Second message',
    //       priority: 'urgent'
    //     })
    //     .set('x-auth', generateAuth(seedUsers.registered[2].id))
    //     .end((err, res) => {
    //       if (err) {
    //         return done(err);
    //       }
    //       done();
    //     })
    // });

    it('/api/v1/group route returns error 500 when database query fails', (done) => {
      Group.findOne = () => Promise.reject(1);
      const token = generateAuth(seedUsers.registered[2].id);
      request(app)
        .post('/api/v1/group')
        .set('x-auth', token)
        .send({
          name: 'Testing group',
          description: 'What it says on the cover',
        })
        .expect(500)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.error).toExist().toBe('Internal server error');
          done()
        });
    });

    describe('User Routes: ', () => {
      it('should send 500 error when server fails', (done) => {
        Group.findById = () => Promise.reject(1);
        request(app)
          .patch(`/api/v1/group/${seedGroups[0].id}/info`)
          .set('x-auth', generateAuth(seedUsers.registered[0].id))
          .send({
            name: "Better name for group",
            type: 'private'
          })
          .expect(500)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(res.body.error).toBe('Internal server error');
            done();
          });
      });
    });
  });

  describe('Catch-all routes', () => {
    it('should send html for all non-api routes', (done) => {
      request(app)
        .get('/heyyo')
        .expect(200)
        .end((err, res) => {
          expect(res.body).toNotBeA('JSON');
          done();
        });
    });

    it('should send html for api doc route', (done) => {
      request(app)
        .get('/api/v1/docs')
        .expect(200)
        .end((err, res) => {
          expect(res.body).toNotBeA('JSON');
          done();
        });
    });

    it('should return 404 error for all nonexistent api GET routes', (done) => {
      request(app)
        .get('/api/heyyo')
        .expect(404)
        .end((err, res) => {
          expect(res.body.error).toNotBeA('Route not found');
          done();
        });
    });

    it('should return 404 error for all nonexistent api POST routes', (done) => {
      request(app)
        .post('/api/heyyo')
        .expect(404)
        .end((err, res) => {
          expect(res.body.error).toNotBeA('Route not found');
          done();
        });
    });
  });
});
