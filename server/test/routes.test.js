import expect from 'expect';
import request from 'supertest';
import app from '../app';
import models from '../models';
import { doBeforeAll, doBeforeEach, populateUsers } from './seeders/testHooks';
import { seedUsers, seedGroups, tokens, generateAuth } from './seeders/seed';

describe('PostIt API routes: ', () => {
  doBeforeAll();
  // populateUsers();
  describe('Can signup or signin user: ', () => {
    it('POST /api/user/signup route should create a new user', (done) => {
      request(app)
      .post('/api/user/signup')
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
    it('POST /api/user/signup route should not pass back user password with response', (done) => {
      request(app)
      .post('/api/user/signup')
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
    it('POST /api/user/signup route should not create user with same username twice', (done) => {
      request(app)
      .post('/api/user/signup')
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
    it('POST /api/user/signup route should not create user with same username twice', (done) => {
      request(app)
      .post('/api/user/signup')
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
    it('POST /api/user/signin route should sign user in', (done) => {
      request(app)
      .post('/api/user/signin')
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
    it('POST /api/user/signin route should not sign user with unregistered username', (done) => {
      request(app)
      .post('/api/user/signin')
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
        expect(res.body.error).toBe('Username is incorrect');
        done();
      }); 
    });
    it('POST /api/user/signin route should not sign user in with incorrect password', (done) => {
      request(app)
      .post('/api/user/signin')
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
        expect(res.body.error).toBe("Password is incorrect");
        done();
      });
    });
    it('POST /api/user/signin route should not pass back user password with response', (done) => {
      request(app)
      .post('/api/user/signin')
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
  });
  
  describe('Protected User routes', () => {
    it('GET /api/user/me route should return current user', (done) => {
      request(app)
      .get('/api/user/me')
      .set('x-auth', generateAuth(102))
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.currentUser.username).toBe('user112');
        expect(res.body.currentUser.password).toNotExist;
        done();
      });
    });

    it('GET /api/users route should get a list of all users', (done) => {
      request(app)
      .get('/api/user/all')
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
    
    it('GET /api/user/me/groups should get user groups', (done) => {
      const token = generateAuth(seedUsers.registered[2].id)
      request(app)
      .get('/api/user/me/groups')
      .set('x-auth', token)
      .expect(200)
      .end((err, res) => {
        expect(res.body.userGroups.length).toBe(3);
        done();
      });
    });
  });

  describe('Group routes', () => {
    const token = generateAuth(seedUsers.registered[1].id);
    it('/api/group route requires group name', (done) => {
      request(app)
      .post('/api/group')
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

    it('/api/group route sets group type to public if private is not specified', (done) => {
      const token = generateAuth(seedUsers.registered[2].id);
      request(app)
      .post('/api/group')
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

    it('Some can add and remove user from groups, or leave groups', (done) => {
      const token = generateAuth(seedUsers.registered[2].id);
      const usernameToAdd = seedUsers.registered[0].username;
      const groupId = seedGroups[0].id;
      request(app)
      .post(`/api/group/${groupId}/user`)
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
        .delete(`/api/group/${groupId}/user`)
        .set('x-auth', token)
        .send({
          username: usernameToAdd
        })
        .expect(201)
        .end((err, res) => {
          console.log(res.body);
          expect(res.body.message).toBe(`${usernameToAdd} removed from group`);
          done();
        })
      });
    });

    it('POST /api/group/:groupid/user returns 400 on non-existent username', (done) => {
      const token = generateAuth(seedUsers.registered[2].id);
      const usernameToAdd = '123';
      const groupId = seedGroups[0].id;
      request(app)
      .post(`/api/group/${groupId}/user`)
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

    it('POST /api/group/:groupid/user returns 400 on user already in group', (done) => {
      const token = generateAuth(seedUsers.registered[2].id);
      const usernameToAdd = seedUsers.registered[2].username;
      const groupId = seedGroups[0].id;
      request(app)
      .post(`/api/group/${groupId}/user`)
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

    it('DELETE /api/group/:groupid only allows group creator remove users', (done) => {
      const user3Token = generateAuth(seedUsers.registered[2].id);
      const user1Token = generateAuth(seedUsers.registered[0].id)
      const groupId = seedGroups[2].id;
      request(app)
      .post(`/api/group/${seedGroups[2].id}/user`)
      .set('x-auth', user3Token)
      .send({
        username: seedUsers.registered[0].username
      })
      .expect(201)
      .end((err, res) => {
        request(app)
        .delete(`/api/group/${groupId}/user`)
        .set('x-auth', user1Token)
        .send({
          username: seedUsers.registered[1].username
        })
        .expect(401)
        .end((err, res) => {
          console.log(res.body);
          expect(res.body.error).toBe('Only a group creator can remove members');
          done();
        });
      });
    });
    
    it('DELETE /api/group/:groupid does not work with non-members', (done) => {
      const user3Token = generateAuth(seedUsers.registered[2].id);
      const user1Token = generateAuth(seedUsers.registered[0].id)
      const groupId = seedGroups[2].id;
      request(app)
      .post(`/api/group/${seedGroups[2].id}/user`)
      .set('x-auth', user3Token)
      .send({
        username: seedUsers.registered[0].username
      })
      .expect(201)
      .end((err, res) => {
        request(app)
        .delete(`/api/group/${groupId}/user`)
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

    it('DELETE /api/group/:groupid/user route does not work with usernames of non-members', (done) => {
      const user3Token = generateAuth(seedUsers.registered[2].id);
      const groupId = seedGroups[2].id;
      request(app)
      .delete(`/api/group/${groupId}/user`)
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

    it('DELETE /api/group/:groupid allows a user leave group', (done) => {
      const user3Token = generateAuth(seedUsers.registered[2].id);
      const user1Token = generateAuth(seedUsers.registered[0].id)
      const groupId = seedGroups[2].id;
      request(app)
      .post(`/api/group/${seedGroups[2].id}/user`)
      .set('x-auth', user3Token)
      .send({
        username: seedUsers.registered[0].username
      })
      .expect(201)
      .end((err, res) => {
        request(app)
        .post(`/api/group/${groupId}/leave`)
        .set('x-auth', user1Token)
        .expect(201)
        .end((err, res) => {
          expect(res.body.message).toBe(`${seedUsers.registered[0].username} has left the group`);
          request(app)
          .post(`/api/group/${groupId}/leave`)
          .set('x-auth', user3Token)
          .expect(201)
          .end((err, res) => {
            expect(res.body.message).toBe(`${seedUsers.registered[2].username} left, and group deleted`);
            done();
          });
        });
      });
    });

    it('GET /api/group/:groupid/users should return list of group users', (done) => {
      const groupId = seedGroups[0].id
      request(app)
      .get(`/api/group/${groupId}/users`)
      .set('x-auth', generateAuth(seedUsers.registered[2].id))
      .expect(200)
      .end((err, res) => {
        expect(res.body.groupUsers).toExist;
        done();
      })
    });

  });
})
