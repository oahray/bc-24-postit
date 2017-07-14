import expect from 'expect';
import request from 'supertest';
import app from '../app';
import models from '../models';

models.User.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true
});

models.Group.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true
});

models.UserGroup.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true
});

models.Message.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true
});

describe('PostIt Tests: ', () => {
  describe('Creating data: ', () => {
    beforeEach((done) => {
      models.sequelize.sync();
      done();
    });
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
          expect(res.body.id).toExist;
          expect(res.body.username).toBe('testuser1');
          expect(res.body.email).toBe('testuser1@example.com');
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
          expect(res.body.username).toBe('testuser2');
          expect(res.body.password).toNotExist;
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
        .expect(201)
        .end((err, res) => {
          expect(res.body.username).toBe('testuser1');
          expect(res.body.id).toExist;
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
        .expect(201)
        .end((err, res) => {
          expect(res.body.username).toBe('testuser2');
          expect(res.body.password).toNotExist;
          done();
        });
    });


  });
});



    // it('POST /api/group', () => {

    // });

    // it('POST /api/group/:groupid/user', () => {

    // });

    // it('POST /api/group/:groupid/message', () => {

    // });

    // it('GET /api/group/:groupid/messages', () => {

    // });

    // it('GET /api/user/signin', () => {

    // });

    // it('POST /api/user/signin', () => {

    // });