import expect from 'expect';
import request from 'supertest';

import app from '../../app';

describe('isValidUsername Middleware', () => {
  it('does not allow a user signup without a username', (done) => {
    request(app)
    .post('/api/v1/user/signup')
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

  it('does not allow a user signup with non-alphanumeric characters', (done) => {
    request(app)
    .post('/api/v1/user/signup')
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
      expect(res.body.error).toBe('Only alphanumeric characters allowed');
      done();
    });
  });

  it('does not allow a user signup with non-alphanumeric characters', (done) => {
    request(app)
    .post('/api/v1/user/signup')
    .send({
      username: 'us',
      email: 'user0@example.com',
      password: 'user0pass'
    })
    .expect(400)
    .end((err, res) => {
      if(err) {
        return done(err);
      }
      expect(res.body.error).toBe('Username cannot be shorter than 3 characters');
      done();
    });
  });

  it('does not allow a user signup with non-alphanumeric characters', (done) => {
    request(app)
    .post('/api/v1/user/signup')
    .send({
      username: 'verylongusername',
      email: 'user0@example.com',
      password: 'user0pass'
    })
    .expect(400)
    .end((err, res) => {
      if(err) {
        return done(err);
      }
      expect(res.body.error).toBe('Username cannot be longer than 12 characters');
      done();
    });
  });
});
