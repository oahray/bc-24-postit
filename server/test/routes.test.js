import expect from 'expect';
import request from 'supertest';
import app from '../app';
import models from '../models';
import { doBeforeAll, doBeforeEach, populateUsers } from './seeders/testHooks';
import { seedUsers, tokens, generateAuth } from './seeders/seed';

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
        expect(res.body.error).toBe('User not found');
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
    it('GET /api/user/me/groups should get user groups', (done) => {
      const name = 'Test Group';
      const description = 'Testing things';
      const type = 'private';
      request(app)
      .post('/api/group')
      .set('x-auth', generateAuth(101))
      .send({
        name,
        description,
        type
      })
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.group.name).toBe(name);

        request(app)
        .get('/api/user/me/groups')
        .set('x-auth', generateAuth(101))
        .expect(200)
        .end((err, res) => {
          expect(res.body.userGroups.length).toBe(1);
          expect(res.body.userGroups[0].name).toBe(name);
          const groupId = res.body.userGroups[0].id;
          request(app)
          .get(`/api/group/${groupId}/users`)
          .set('x-auth', generateAuth(101))
          .expect(200)
          .end((err, res) => {
            expect(res.body.users).toExist;
            done();
          })
        })
      });
    })
  });
});