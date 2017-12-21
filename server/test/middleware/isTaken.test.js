import expect from 'expect';
import request from 'supertest';

import app from '../../app';

describe('isTaken Middleware', () => {
  it('does not allow users signup without email', (done) => {
    request(app)
    .post('/api/v1/user/signup')
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
    .post('/api/v1/user/signup')
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
