import expect from 'expect';
import * as  request from 'supertest';
import app from '../app';
import { User, Group, Message } from '../models';

describe('POST /api/user/signup', () => {
  it('should create a new User', (done) => {
    request(app)
      .post('/api/user.signup')
      .send({
        username: 'ray'
      })
  });
});

