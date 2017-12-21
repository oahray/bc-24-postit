import expect from 'expect';
import request from 'supertest';

import app from '../../app';

describe('isValidEmail Middleware', () => {
  it('does not allow users signup with invalid email', (done) => {
    request(app)
    .post('/api/v1/user/signup')
    .send({
      username: 'user0',
      password: 'user0pass',
      email: 'user0'
    })
    .expect(400)
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res.body.error).toBe('Invalid email format.');
      done();
    });
  });
});
