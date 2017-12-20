import expect from 'expect';
import request from 'supertest';

import models from '../../models';
import app from '../../app';
import { doBeforeAll, doBeforeEach, populateUsers } from '../seeders/testHooks';
import { seedUsers, seedGroups, generateAuth, tokens } from '../seeders/seed';

describe('Authenticate Middleware: ', () => {
  doBeforeAll();
  
  it('POST /api/v1/signup route should be accessible to unauthenticated users', (done) => {
    request(app)
    .post('/api/v1/user/signup')
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
  it('POST /api/v1/user/me route should not be accessible to unauthenticated users', (done) => {
    request(app)
    .get('/api/v1/user/me')
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
  it('POST /api/v1/user/me route should not be accessible to users with incorrect token', (done) => {
    const token = generateAuth(99);
    request(app)
    .get('/api/v1/user/me')
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
  it('POST /api/v1/user/me route should not be accessible to users with invalid token', (done) => {
    const token = '123';
    request(app)
    .get('/api/v1/user/me')
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
