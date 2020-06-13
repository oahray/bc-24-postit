import expect from 'expect';
import request from 'supertest';

import app from '../../app';

describe('Catch-all routes', () => {
  it('should send html for all non-api routes', (done) => {
    request(app)
      .get('/heyyo')
      .expect('Content-Type', /html/)
      .expect(200)
      .end(done);
  });

  it('should send html for api doc route', (done) => {
    request(app)
      .get('/api/v1/docs/')
      .expect('Content-Type', /html/)
      .expect(200)
      .end(done);
  });

  it("should reroute '/doc' to api doc route", (done) => {
    request(app)
      .get('/api/v1/docs')
      .expect('Content-Type', /html/)
      .expect(301)
      .end(done);
  });

  it('should return 404 error for all nonexistent api GET routes', (done) => {
    request(app)
      .get('/api/heyyo')
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.error).toNotBeA('Route not found');
        done();
      });
  });

  it('should return 404 error for all nonexistent api POST routes', (done) => {
    request(app)
      .post('/api/heyyo')
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.error).toNotBeA('Route not found');
        done();
      });
  });
});
