import expect from 'expect';
import request from 'supertest';
import app from '../app';
import models from '../models';
import { doBeforeAll, doBeforeEach, populateUsers } from './seeders/testHooks';
import { seedUsers, tokens, generateAuth } from './seeders/seed';

describe('Data Models:', () => {
  doBeforeAll();
  describe('#User model', () => {
    it('should create a user instance', (done) => {
      models.User.create({
        username: 'testuser',
        password: 'testpass',
        email: 'testing1@example.com'
      })
      .then((user) => {
        expect(user).toExist;
        expect(user.id).toExist().toBeA('number');
        expect(user.username).toBe('testuser');
        expect(user.email).toBe('testing1@example.com');
        done();
      });
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

    it('beforeCreate class method should hash passwords before they are stored', (done) => {
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

    it('beforeUpdate class method should not modify passwords if they are not updated', (done) => {
      let initEmail
      models.User.findOne({ where: {
        username: 'testuser'
      }})
      .then((user) => {
        const userData = user.dataValues;
        expect(userData).toExist;
        initEmail = userData.email;
        expect(initEmail).toBe('testing1@example.com');
        user.update({
          email: 'newemail@example.com'
        })
        .then((update) => {
          expect(update.email).toNotBe(initEmail);
          expect(update.username).toBe(user.username);
          expect(update.password).toBe(user.password);
          done();
        });
      });
    });

    it('beforeUpdate class method should modify passwords if updated by authenticated user', (done) => {
      let initPassword;
      models.User.findOne({ where: {
        username: 'testuser2'
      }})
      .then((user) => {
        expect(user).toExist;
        initPassword = user.password;
        expect(initPassword).toExist;
        expect(user.email).toBe('testing2@example.com');
        user.update({
          password: 'mynewpassword'
        })
        .then((update) => {
          expect(update.password).toNotBe(initPassword);
          done();
        })
      });
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

    it('generateAuthToken instance method should generate a token', (done) => {
      models.User.create({
        username: 'testUser7',
        password: 'somethingelse',
        email: 'testuser7@example.com'
      })
      .then((user) => {
        const token = user.generateAuthToken()
        expect(token).toExist().toBeA('string');
        done();
      });
    });
  });

  describe('#Group model', () => {
    it('should create a Group instance', (done) => {
      models.Group.create({
        name: "My first test group",
        type: 'private',
        createdBy: "User1"
      })
      .then((group) => {
        expect(group).toExist;
        expect(group.name).toBe("My first test group");
        expect(group.type).toBe('private')
        done();
      }).catch((err) => done(err));
    });

    it('should be the class of the created instance', (done) => {
      models.Group.create({
        name: "My test group",
        createdBy: 'User2',
        type: 'public'
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
      priority: 'urgent',
      sender: 'user1',
      readBy: 'user1'
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
