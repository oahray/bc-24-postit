import expect from 'expect';
import request from 'supertest';
import app from '../app';
import models from '../models';
import { doBeforeAll, doBeforeEach, populateUsers } from './seeders/testHooks';
import { seedUsers, seedGroups, generateAuth, tokens } from './seeders/seed';

describe('Middleware functions:', () => {
  // doBeforeAll();
  describe('isValidUsername Middleware', () => {
    it('does not allow a user signup without a username', (done) => {
      request(app)
      .post('/api/user/signup')
      .send({
        email: 'user0@example.com',
        password: 'user0pass'
      })
      .expect(400)
      .end((err, res) => {
        if(err) {
          return done(err);
        }
        expect(res.body.error).toBe('Username is required.');
        done();
      });
    });
    it('does not allow a user signup with invalid username', (done) => {
      request(app)
      .post('/api/user/signup')
      .send({
        username: 'user0.3',
        email: 'user0@example.com',
        password: 'user0pass'
      })
      .expect(400)
      .end((err, res) => {
        if(err) {
          return done(err);
        }
        expect(res.body.error).toBe('Invalid Username format.');
        done();
      });
    });
  });

  describe('isTaken Middleware', () => {
    it('does not allow users signup without email', (done) => {
      request(app)
      .post('/api/user/signup')
      .send({
        username: 'user0',
        password: 'user0pass'
      })
      .expect(400)
      .end((err, res) => {
        if(err) {
          return done(err);
        }
        expect(res.body.error).toBe('Email is required.');
        done();
      });
    });
    it('does not allow users signup without password', (done) => {
      request(app)
      .post('/api/user/signup')
      .send({
        username: 'user0',
        email: 'user0@example.com'
      })
      .expect(400)
      .end((err, res) => {
        if(err) {
          return done(err);
        }
        expect(res.body.error).toBe('Password is required.');
        done();
      });
    });
  });

  describe('isGroupMember Middleware', () => {
    it('should not allow users access a group route without passing a group id', (done) => {
      request(app)
      .get(`/api/group/ /users`)
      .set('x-auth', tokens[2])
      // .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.error).toBe('GroupId must be provided');
        done();
      });
    });
    it('should not allow users access a group route with a non-existent group id', (done) => {
      request(app)
      .get(`/api/group/56/users`)
      .set('x-auth', tokens[2])
      // .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.error).toBe('Specified group does not exist');
        done();
      });
    });
    it('should not allow users access a group they do not belong to', (done) => {
      request(app)
      .get(`/api/group/${seedGroups[1].id}/users`)
      .set('x-auth', tokens[1])
      .expect(401)
      .end((err, res) => {
        expect(res.body.error).toBe('You must belong to a group to interact with it');
        done();
      })
      });
    });
  });

  describe('Authenticate Middleware: ', () => {
    it('POST /api/signup route should be accessible to unauthenticated users', (done) => {
      request(app)
      .post('/api/user/signup')
      .send({
        username: 'user1',
        password: 'mypassword',
        email: 'user1@example.com'
      })
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.user.id).toExist;
        expect(res.body.user.username).toBe('user1');
        expect(res.body.user.email).toBe('user1@example.com');
        done();
      });
    });
    it('POST /api/user/me route should not be accessible to unauthenticated users', (done) => {
      request(app)
      .get('/api/user/me')
      .expect(401)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.id).toNotExist;
        expect(res.body.error).toBe('You need to signup or login first');
        done();
      });
    });
    it('POST /api/user/me route should not be accessible to users with incorrect token', (done) => {
      const token = generateAuth(99);
      request(app)
      .get('/api/user/me')
      .set('x-auth', token)
      .expect(401)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.id).toNotExist;
        expect(res.body.error).toBe('User could not be verifed. Signup or login first');
        done();
      })
    });
    it('POST /api/user/me route should not be accessible to users with invalid token', (done) => {
      const token = '123';
      request(app)
      .get('/api/user/me')
      .set('x-auth', token)
      .expect(401)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.id).toNotExist;
        done();
      })
    });
  });

