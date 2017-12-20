import expect from 'expect';
import { User, Group } from '../../models';
import { doBeforeAll } from '../seeders/testHooks';

describe('User model', () => {
  doBeforeAll();

  it('should create a user instance', (done) => {
    User.create({
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
    User.create({
      username: 'testuser2',
      password: 'testpass',
      email: 'testing2@example.com'
    })
    .then((user) => {
      expect(user).toExist;
      expect(user instanceof User).toBe(true);
      done();
    }).catch(err => done(err));
  });

  it('should hash passwords before they are stored',
  (done) => {
    User.create({
      username: 'testuser3',
      password: 'testpass',
      email: 'testing3@example.com'
    })
    .then((user) => {
      expect(user).toExist;
      expect(user.password).toExist;
      expect(user.password).toNotBe('testpass');
      done();
    }).catch(err => done(err));
  });

  it('should not modify passwords if they are not updated', (done) => {
    let initEmail;
    User.findOne({ where: {
      username: 'testuser'
    } })
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

  it('should modify passwords if updated by authenticated user', (done) => {
    let initPassword;
    User.findOne({ where: {
      username: 'testuser2'
    } })
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
      });
    });
  });

  it('should be able to detect valid passwords',
  (done) => {
    User.create({
      username: 'testuser4',
      password: 'somethingweird',
      email: 'testing4@example.com'
    })
    .then((user) => {
      expect(user).toExist;
      expect(user.password).toExist;
      expect(user.validPassword('somethingweird')).toBe(true);
      done();
    }).catch(err => done(err));
  });

  it('should be able to detect invalid passwords',
  (done) => {
    User.create({
      username: 'testuser5',
      password: 'somethingweirder',
      email: 'testing5@example.com'
    })
    .then((user) => {
      expect(user).toExist;
      expect(user.password).toExist;
      expect(user.validPassword('somethingweird')).toBe(false);
      done();
    }).catch(err => done(err));
  });

  it('should not pass along user password', (done) => {
    User.create({
      username: 'testuser6',
      password: 'somethingweirder',
      email: 'testing6@example.com'
    })
    .then((user) => {
      expect(user).toExist;
      expect(user.password).toExist;
      expect(user.toJSON().password).toNotExist;
      done();
    }).catch(err => done(err));
  });

  it('should generate a token', (done) => {
    User.create({
      username: 'testUser7',
      password: 'somethingelse',
      email: 'testuser7@example.com'
    })
    .then((user) => {
      const token = user.generateAuthToken();
      expect(token).toExist().toBeA('string');
      done();
    });
  });
});
