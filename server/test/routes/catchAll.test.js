import expect from 'expect';
import request from 'supertest';

import app from '../../app';

describe('Catch-all routes', () => {
  it('should send html for all non-api routes', (done) => {
    request(app)
      .get('/heyyo')
      .expect(200)
      .end((err, res) => {
        expect(res.body).toNotBeA('JSON');
        done();
      });
  });

  it('should send html for api doc route', (done) => {
    request(app)
      .get('/api/v1/docs')
      .expect(200)
      .end((err, res) => {
        expect(res.body).toNotBeA('JSON');
        done();
      });
  });

  it('should return 404 error for all nonexistent api GET routes', (done) => {
    request(app)
      .get('/api/heyyo')
      .expect(404)
      .end((err, res) => {
        expect(res.body.error).toNotBeA('Route not found');
        done();
      });
  });

  it('should return 404 error for all nonexistent api POST routes', (done) => {
    request(app)
      .post('/api/heyyo')
      .expect(404)
      .end((err, res) => {
        expect(res.body.error).toNotBeA('Route not found');
        done();
      });
  });
});
