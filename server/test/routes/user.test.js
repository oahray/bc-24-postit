import expect from 'expect';
import request from 'supertest';

import app from '../../app';
import '../../bin/www';
import { Group, User } from '../../models';
import { transporter } from '../../config/nodemailer';
import { doBeforeAll, createPopulatedGroups } from '../seeders/testHooks';
import { seedUsers, seedGroups, tokens } from '../seeders/seed';

describe('POST /api/v1/user/signup route', () => {
  doBeforeAll();
  it('should create a new user', (done) => {
    request(app)
      .post('/api/v1/user/signup')
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
        expect(res.body.user.id).toExist();
        expect(res.body.user.username).toBe('testuser1');
        expect(res.body.user.email).toBe('testuser1@example.com');
        done();
      });
  });

  it('should not pass back user password with response', (done) => {
    request(app)
      .post('/api/v1/user/signup')
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
        expect(res.body.user.username).toBe('testuser2');
        expect(res.body.user.password).toNotExist();
        done();
      });
  });

  it('should not create user with same username twice', (done) => {
    request(app)
      .post('/api/v1/user/signup')
      .send({
        username: 'testuser2',
        email: 'testuser3@example.com',
        password: 'mypassword',
      })
      .expect(409)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.user).toNotExist();
        expect(res.body.error).toBe('Username already taken.');
        done();
      });
  });

  it('should not create user with same email twice', (done) => {
    request(app)
      .post('/api/v1/user/signup')
      .send({
        username: 'testuser3',
        email: 'testuser2@example.com',
        password: 'mypassword',
      })
      .expect(409)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.user).toNotExist();
        expect(res.body.error).toBe('Email already taken.');
        done();
      });
  });
});

describe('POST /api/v1/user/signin route', () => {
  it('should sign user in', (done) => {
    request(app)
      .post('/api/v1/user/signin')
      .send({
        username: 'testuser1',
        password: 'mypassword',
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.user.username).toBe('testuser1');
        expect(res.body.user.id).toExist();
        done();
      });
  });

  it('should not sign user with unregistered username', (done) => {
    request(app)
      .post('/api/v1/user/signin')
      .send({
        username: 'thisOneDoesNotExist',
        password: 'doesNotMatter'
      })
      .expect(401)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.user).toNotExist();
        expect(res.body.error).toBe('Username/Password is incorrect');
        done();
      });
  });

  it('should not sign user in with incorrect password', (done) => {
    request(app)
      .post('/api/v1/user/signin')
      .send({
        username: 'testuser1',
        password: 'mypasswor',
      })
      .expect(401)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.user).toNotExist();
        expect(res.body.error).toBe('Username/Password is incorrect');
        done();
      });
  });
  it('should not pass back user password with response', (done) => {
    request(app)
      .post('/api/v1/user/signin')
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
        expect(res.body.user.username).toBe('testuser2');
        expect(res.body.user.password).toNotExist();
        done();
      });
  });

  it('should return error if no password entered', (done) => {
    request(app)
      .post('/api/v1/user/signin')
      .send({
        username: 'testuser2'
      })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.error).toExist().toBe('Password must not be empty');
        done();
      });
  });
});

describe('GET /api/v1/user/me route', () => {
  it('should return current user', (done) => {
    request(app)
      .get('/api/v1/user/me')
      .set('x-auth', tokens[2])
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.currentUser.username).toBe('user113');
        expect(res.body.currentUser.password).toNotExist();
        done();
      });
  });
});

describe('GET /api/v1/users route', () => {
  it('GET /api/v1/users route should get a list of all users', (done) => {
    request(app)
      .get('/api/v1/user/all')
      .set('x-auth', tokens[2])
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.users).toBeAn('object');
        expect(Array.isArray(res.body.users)).toBe(true);
        expect(res.body.users.length).toBeGreaterThanOrEqualTo(3);
        expect(res.body.users).toExist();
        done();
      });
  });
});

describe('GET /api/v1/user/me/groups route', () => {
  it('GET /api/v1/user/me/groups should get user groups', (done) => {
    request(app)
      .get('/api/v1/user/me/groups')
      .set('x-auth', tokens[2])
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.body.userGroups.length).toBe(3);
        done();
      });
  });
});

describe('GET /api/v1/user/me route', () => {
  it('GET /api/v1/user/me/messages should get user messages', (done) => {
    request(app)
      .get('/api/v1/user/me/messages')
      .set('x-auth', tokens[2])
      .expect(200)
      .end((err, res) => {
        expect(res.body.messages).toExist();
        done();
      });
  });
});

describe('PATCH /api/v1/user/me/password route', () => {
  it('PATCH /api/v1/user/me/password route should return 400 if current password is not supplied', (done) => {
    request(app)
      .patch('/api/v1/user/me/password')
      .set('x-auth', tokens[1])
      .send({
        newpassword: 'changedThis'
      })
      .expect(400)
      .end((err, res) => {
        expect(res.body.error).toBe('Current password required');
        done();
      });
  });

  it('should return 400 if new password is not supplied', (done) => {
    request(app)
      .patch('/api/v1/user/me/password')
      .set('x-auth', tokens[1])
      .send({
        currentpassword: seedUsers.registered[1].password
      })
      .expect(400)
      .end((err, res) => {
        expect(res.body.error).toBe('New password required');
        done();
      });
  });

  it('should return 400 if current password is incorrect', (done) => {
    request(app)
      .patch('/api/v1/user/me/password')
      .set('x-auth', tokens[1])
      .send({
        currentpassword: 'cannotRemember',
        newpassword: 'changedThis'
      })
      .expect(400)
      .end((err, res) => {
        expect(res.body.error).toBe('Password is incorrect');
        done();
      });
  });

  it('should return 400 if new password is the same as current', (done) => {
    request(app)
      .patch('/api/v1/user/me/password')
      .set('x-auth', tokens[1])
      .send({
        currentpassword: seedUsers.registered[1].password,
        newpassword: seedUsers.registered[1].password,
      })
      .expect(400)
      .end((err, res) => {
        expect(res.body.error).toBe('New password is the same as current');
        done();
      });
  });

  it('should successfully update password', (done) => {
    request(app)
      .patch('/api/v1/user/me/password')
      .set('x-auth', tokens[1])
      .send({
        currentpassword: seedUsers.registered[1].password,
        newpassword: 'changedThis'
      })
      .expect(201)
      .end((err, res) => {
        expect(res.body.message).toBe('Password successfully updated');
        done();
      });
  });
});

describe('GET /api/v1/user/me/edit route', () => {
  it('should return error when email is empty', (done) => {
    request(app)
      .patch('/api/v1/user/me/edit')
      .set('x-auth', tokens[1])
      .send({
        about: 'Awesome me'
      })
      .expect(400)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.body.error).toBe('Email is required');
        done();
      });
  });

  it('PATCH /api/v1/user/me/edit route should successfully update profile', (done) => {
    const email = 'updatedemail@example.com';
    request(app)
      .patch('/api/v1/user/me/edit')
      .set('x-auth', tokens[1])
      .send({
        email
      })
      .expect(201)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.body.message).toBe('Profile successfully updated');
        expect(res.body.profile.email).toBe(email);
        done();
      });
  });
});

describe('POST /api/v1/forgotpassword route', () => {
  doBeforeAll();
  it('should return error if no recovery email is provided', (done) => {
    request(app)
      .post('/api/v1/forgotpassword')
      .expect(400)
      .end((err, res) => {
        expect(res.body.error).toBe('Email is required for password recovery');
        done();
      });
  });

  it('should return error if no valid recovery email is provided', (done) => {
    request(app)
      .post('/api/v1/forgotpassword')
      .send({
        email: 'some email'
      })
      .expect(404)
      .end((err, res) => {
        expect(res.body.error).toBe('Incorrect email');
        done();
      });
  });

  it('should send reset email', (done) => {
    transporter.sendMail = () => Promise.resolve(1);
    const email = seedUsers.registered[1].email;
    request(app)
      .post('/api/v1/forgotpassword')
      .send({
        email
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe(`An email with reset instructions has been sent to ${email}`);
        done();
      });
  });
});

describe('POST /api/v1/resetpassword route', () => {
  doBeforeAll();
  it('should return error if no reset hash is provided', (done) => {
    request(app)
      .post('/api/v1/resetpassword?')
      .send({
        password: 'newPassword'
      })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.error).toBe('Invalid reset link.');
        done();
      });
  });

  it('should return error if no password is provided', (done) => {
    request(app)
      .post('/api/v1/resetpassword?t=fjdhstjdfkgjlhklk')
      .send({
        password: ''
      })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.error).toBe('Password is required!');
        done();
      });
  });

  it('should return error if reset link is invalid', (done) => {
    request(app)
      .post('/api/v1/resetpassword?t=somerandomstuff')
      .send({
        password: 'somepassword'
      })
      .expect(401)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.error).toBe('Link cannot be validated.');
        done();
      });
  });

  it('should return error if reset link has expired', (done) => {
    request(app)
      .post(`/api/v1/resetpassword?t=${seedUsers.registered[3].resetHash}`)
      .send({
        password: 'somepassword'
      })
      .expect(401)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.error).toBe('Reset link has expired.');
        done();
      });
  });

  it('should successfully reset password with valid authentication', (done) => {
    request(app)
      .post(`/api/v1/resetpassword?t=${seedUsers.registered[4].resetHash}`)
      .send({
        password: 'myNewPassword'
      })
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Your password has been successfully updated.');
        done();
      });
  });
});


describe('Catch block in', () => {
  describe('POST /api/v1/group/:groupid/remove route', () => {
    it('should return 500 error for server failure', (done) => {
      User.findAndCountAll = () => Promise.reject(1);
      const groupId = seedGroups[1].id;
      request(app)
        .get(`/api/v1/group/${groupId}/users?members=false`)
        .set('x-auth', tokens[2])
        .expect(500)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.error).toBe('Internal server error');
          done();
        });
    });

    it('should return 500 error for server failure to delete group', (done) => {
      Group.prototype.destroy = () => Promise.reject(1);
      const groupId = seedGroups[1].id;
      request(app)
        .post(`/api/v1/group/${groupId}/remove`)
        .set('x-auth', tokens[2])
        .expect(500)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.error).toBe('Internal server error');
          done();
        });
    });
  });

  describe('POST /api/v1/forgotpassword route', () => {
    it('should return 500 for recovery email not sent', (done) => {
      transporter.sendMail = () => Promise.reject(1);
      const email = seedUsers.registered[1].email;
      request(app)
        .post('/api/v1/forgotpassword')
        .send({
          email
        })
        .expect(500)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.error).toBe('Error sending recovery mail. Please try again later');
          done();
        });
    });
  });

  describe('POST /api/v1/forgotpassword route', () => {
    it('should return 500 for failure to update user profile with generated hash', (done) => {
      User.prototype.update = () => Promise.reject(1);
      const email = seedUsers.registered[1].email;
      request(app)
        .post('/api/v1/forgotpassword')
        .send({
          email
        })
        .expect(500)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.error).toBe('Internal server error');
          done();
        });
    });
  });

  describe('POST /api/v1/group/:groupid/remove route', () => {
    it('should return 500 for failure to create user', (done) => {
      User.create = () => Promise.reject(1);
      request(app)
        .post('/api/v1/user/signup')
        .send({
          username: 'testingguy',
          email: 'testuser1@example.com',
          password: 'mypassword',
        })
        .expect(500)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.error).toExist().toBe('Internal server error');
          done();
        });
    });
  });

  describe('isGroupMember middleware', () => {
    it('should send 500 error when server fails', (done) => {
      Group.findById = () => Promise.reject(1);
      request(app)
        .patch(`/api/v1/group/${seedGroups[0].id}/info`)
        .set('x-auth', tokens[0])
        .send({
          name: 'Better name for group',
          type: 'private'
        })
        .expect(500)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.error).toBe('Internal server error');
          done();
        });
    });
  });

  describe('POST /api/v1/group route', () => {
    it('returns error 500 when database query fails', (done) => {
      Group.findOne = () => Promise.reject(1);
      request(app)
        .post('/api/v1/group')
        .set('x-auth', tokens[2])
        .send({
          name: 'Testing group',
          description: 'What it says on the cover',
        })
        .expect(500)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.error).toExist().toBe('Internal server error');
          done();
        });
    });
  });

  describe('PATCH /api/v1/group/:groupid/info route', () => {
    it('should send 500 error when server fails', (done) => {
      Group.findById = () => Promise.reject(1);
      request(app)
        .patch(`/api/v1/group/${seedGroups[0].id}/info`)
        .set('x-auth', tokens[0])
        .send({
          name: 'Better name for group',
          type: 'private'
        })
        .expect(500)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.error).toBe('Internal server error');
          done();
        });
    });
  });
});
