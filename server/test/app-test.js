import expect from 'expect';
import request from 'supertest';
import app from '../app';
import models from '../models';

const doBeforeAll = () => {
  before((done) => {
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
    done();
  });
};

const doBeforeEach = () => {
  beforeEach((done) => {
    models.sequelize.sync();
    done();
  });
};

describe('Data Models:', () => {
  doBeforeAll();
  describe('#User model', () => {
    it('should create a user instance', (done) => {
      models.User.create({
        username: 'testuser',
        password: 'testpass',
        email: 'testing@example.com'
      })
      .then((user) => {
        expect(user).toExist;
        expect(user.id).toExist;
        expect(user.id).toBeA('number');
        expect(user.username).toBe('testuser');
        expect(user.email).toBe('testing@example.com');
        done();
      }).catch((err) => done(err));
    });

    it('should be the class of the created instance', (done) => {
      models.User.create({
        username: 'testuser2',
        password: 'testpass',
        email: 'testing2@example.com'
      })
      .then((user) => {
        expect(user).toExist;
        expect(user instanceof models.User).toBe(true);
        done();
      }).catch((err) => done(err));
    });

    it('hashPassword class method should hash passwords before they are stored', (done) => {
      models.User.create({
        username: 'testuser3',
        password: 'testpass',
        email: 'testing3@example.com'
      })
      .then((user) => {
        expect(user).toExist;
        expect(user.password).toExist;
        expect(user.password).toNotBe('testpass');
        done();
      }).catch((err) => done(err));
    });

    it('validate Password instance method should be able to detect valid passwords', (done) => {
      models.User.create({
        username: 'testuser4',
        password: 'somethingweird',
        email: 'testing4@example.com'
      })
      .then((user) => {
        expect(user).toExist;
        expect(user.password).toExist;
        expect(user.validPassword('somethingweird')).toBe(true);
        done();
      }).catch((err) => done(err));
    });

    it('validPassword instance method should be able to detect invalid passwords', (done) => {
      models.User.create({
        username: 'testuser5',
        password: 'somethingweirder',
        email: 'testing5@example.com'
      })
      .then((user) => {
        expect(user).toExist;
        expect(user.password).toExist;
        expect(user.validPassword('somethingweird')).toBe(false);
        done();
      }).catch((err) => done(err));
    });

    it('toJSON instance method should not pass along user password', (done) => {
      models.User.create({
        username: 'testuser6',
        password: 'somethingweirder',
        email: 'testing6@example.com'
      })
      .then((user) => {
        expect(user).toExist;
        expect(user.password).toExist;
        expect(user.toJSON().password).toNotExist;
        done();
      }).catch((err) => done(err));
    });
  });

  describe('#Group model', () => {
    it('should create a Group instance', (done) => {
      models.Group.create({
        title: "My first test group"
      })
      .then((group) => {
        expect(group).toExist;
        expect(group.title).toBe("My first test group");
        done();
      }).catch((err) => done(err));
    });

    it('should be the class of the created instance', (done) => {
      models.Group.create({
        title: "My test group"
      })
      .then((group) => {
        expect(group).toExist;
        expect(group instanceof models.Group).toBe(true);
        done();
      }).catch((err) => done(err));
    });
  });

  describe('#Message model', () => {
    const myMessage = {
      content: 'testing... testing',
      priority: 'urgent'
    };
    it('should create a Message instance', (done) => {
      models.Message.create(myMessage)
      .then((message) => {
        expect(message).toExist;
        expect(message.content).toBe('testing... testing');
        expect(message.priority).toBe('urgent');
        done();
      }).catch((err) => done(err));
    });

    it('should be the class of the created message instance', (done) => {
      models.Message.create(myMessage)
      .then((message) => {
        expect(message).toExist;
        expect(message instanceof models.Message).toBe(true);
        done();
      }).catch((err) => done(err));
    });

    it('verifyPriority instance method should return true for normal priority', (done) => {
      expect(models.Message.verifyPriority('normal')).toBe(true);
      done();
    });

    it('verifyPriority instance method should return true for urgent priority', (done) => {
      expect(models.Message.verifyPriority('urgent')).toBe(true);
      done();
    });

    it('verifyPriority instance method should return true for critical priority', (done) => {
      expect(models.Message.verifyPriority('critical')).toBe(true);
      done();
    });

    it('verifyPriority instance method should return false for invalid priority', (done) => {
      expect(models.Message.verifyPriority('quick')).toBe(false);
      expect(models.Message.verifyPriority('normale')).toBe(false);
      expect(models.Message.verifyPriority('urgentt')).toBe(false);
      expect(models.Message.verifyPriority('kritikal')).toBe(false);
      done();
    });

    it('verifyPriority instance method should trim trailing spaces', (done) => {
      expect(models.Message.verifyPriority('      normal')).toBe(true);
      expect(models.Message.verifyPriority('urgent      ')).toBe(true);
      expect(models.Message.verifyPriority('      critical      ')).toBe(true);
      done();
    });

    it('verifyPriority instance method should be case insensitive', (done) => {
      expect(models.Message.verifyPriority('NorMal')).toBe(true);
      expect(models.Message.verifyPriority('NORmal')).toBe(true);
      expect(models.Message.verifyPriority('urGENT')).toBe(true);
      expect(models.Message.verifyPriority('CRITICAL')).toBe(true);
      done();
    });
  });
  
});

describe('PostIt API routes: ', () => {
  doBeforeAll();
  doBeforeEach();
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
        expect(res.body.id).toNotExist;
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
        expect(res.body.id).toNotExist;
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
});

describe('Middleware functions:', () => {
  describe('Authenticate Middleware: ', () => {
    doBeforeAll();
    doBeforeEach();
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
    it('POST /api/user/logout route should not be accessible to unauthenticated users', (done) => {
      request(app)
      .post('/api/user/logout')
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
    it('POST /api/group/:groupid/user route should not be accessible to unauthenticated users', (done) => {
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
    it('POST /api/group/:groupid/message route should not be accessible to unauthenticated users', (done) => {
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
