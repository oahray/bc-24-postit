import expect from 'expect';
import request from 'supertest';

import app from '../../app';
import { seedUsers, seedGroups, generateAuth, tokens } from '../seeders/seed';

describe('isGroupMember middleware', () => {
  it('returns error if group id is not provided', (done) => {
    request(app)
    .get(`/api/v1/group/${null}/users`)
    .set('x-auth', tokens[0])
    .expect(400)
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res.body.error).toBe('Valid group ID must be provided');
      done();
    });
  });

  it('returns error if group does not exist', (done) => {
    request(app)
    .get(`/api/v1/group/32/users`)
    .set('x-auth', tokens[0])
    .expect(404)
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res.body.error).toBe('Specified group does not exist');
      done();
    });
  });

  it('returns error if user does not belong to the group', (done) => {
    request(app)
    .get(`/api/v1/group/${seedGroups[1].id}/users`)
    .set('x-auth', tokens[0])
    .expect(401)
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res.body.error).toBe('You must belong to a group to interact with it');
      done();
    });
  });
});
