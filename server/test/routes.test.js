import expect from 'expect';
import request from 'supertest';
import app from '../app';
import models from '../models';
import { doBeforeAll, doBeforeEach } from './seeders/testHooks';

describe('PostIt API routes: ', () => {
  doBeforeAll();
  describe('Can create data: ', () => {
    it('POST /api/user/signup route should create a new User', (done) => {
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
    it('POST /api/user/signin route should not sign user in with incorrect credentials', (done) => {
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
});