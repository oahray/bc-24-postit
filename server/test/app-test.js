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
        if (err) {
          return done(err);
        }
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
        if (err) {
          return done(err);
        }
        expect(res.body.username).toBe('testuser2');
        expect(res.body.password).toNotExist;
        done();
      });
    });
    it('POST /api/user/signup route should not create the same user twice', (done) => {
      request(app)
      .post('/api/user/signup')
      .send({
        username: 'testuser2',
        email: 'testuser2@example.com',
        password: 'mypassword',
      })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.id).toNotExist;
        expect(res.body.error).toBe("Username already taken.")
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
        expect(res.body.username).toBe('testuser1');
        expect(res.body.id).toExist;
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
        expect(res.body.username).toNotExist;
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
        expect(res.body.username).toBe('testuser2');
        expect(res.body.password).toNotExist;
        done();
      });
    });


  });

  describe('Middleware functions: ', () => {
    beforeEach((done) => {
      models.sequelize.sync();
      done();
    });
    it('POST /api/user/me route should not be accessible to unauthenticated users', (done) => {
      request(app)
      .get('/api/user/me')
      .expect(401)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.id).toExist;
        expect(res.body.error).toBe('You need to signup or login first');
        done();
      });
    });
    it('POST /api/user/me/groups route should not be accessible to unauthenticated users', (done) => {
      request(app)
      .get('/api/user/me/groups')
      .expect(401)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.id).toExist;
        expect(res.body.error).toBe('You need to signup or login first');
        done();
      });
    });
    it('POST /api/user/me/messages route should not be accessible to unauthenticated users', (done) => {
      request(app)
      .get('/api/user/me/messages')
      .expect(401)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.id).toExist;
        expect(res.body.error).toBe('You need to signup or login first');
        done();
      });
    });
    it('POST /api/group route should not be accessible to unauthenticated users', (done) => {
      request(app)
      .post('/api/group')
      .send({ title: 'testGroup' })
      .expect(401)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.id).toExist;
        expect(res.body.error).toBe('You need to signup or login first');
        done();
      });
    });
    it('POST /api/group/1/user route should not be accessible to unauthenticated users', (done) => {
      request(app)
      .post('/api/group/1/user')
      .send({ username: 'testuser2' })
      .expect(401)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.id).toExist;
        expect(res.body.error).toBe('You need to signup or login first');
        done();
      });
    });
    it('POST /api/group/1/message route should not be accessible to unauthenticated users', (done) => {
      request(app)
      .post('/api/group/1/message')
      .send({ title: 'testMessage' })
      .expect(401)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.id).toExist;
        expect(res.body.error).toBe('You need to signup or login first');
        done();
      });
    });
    
  });
});