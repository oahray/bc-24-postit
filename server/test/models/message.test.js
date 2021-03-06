import expect from 'expect';
import { Message } from '../../models';

describe('Message model', () => {
  const myMessage = {
    content: 'testing... testing',
    priority: 'urgent',
    sender: 'user1',
    readBy: 'user1'
  };
  it('should create a Message instance', (done) => {
    Message.create(myMessage)
    .then((message) => {
      expect(message).toExist;
      expect(message.content).toBe('testing... testing');
      expect(message.priority).toBe('urgent');
      done();
    }).catch(err => done(err));
  });

  it('should be the class of the created message instance', (done) => {
    Message.create(myMessage)
    .then((message) => {
      expect(message).toExist;
      expect(message instanceof Message).toBe(true);
      done();
    }).catch(err => done(err));
  });

  describe('verifyPriority instance method', () => {
    it('should return true for normal priority',
    (done) => {
      expect(Message.verifyPriority('normal')).toBe(true);
      done();
    });

    it('should return true for urgent priority',
    (done) => {
      expect(Message.verifyPriority('urgent')).toBe(true);
      done();
    });

    it('should return true for critical priority', (done) => {
      expect(Message.verifyPriority('critical')).toBe(true);
      done();
    });

    it('should return false for invalid priority', (done) => {
      expect(Message.verifyPriority('quick')).toBe(false);
      expect(Message.verifyPriority('normale')).toBe(false);
      expect(Message.verifyPriority('urgentt')).toBe(false);
      expect(Message.verifyPriority('kritikal')).toBe(false);
      done();
    });

    it('should trim trailing spaces', (done) => {
      expect(Message.verifyPriority('      normal')).toBe(true);
      expect(Message.verifyPriority('urgent      ')).toBe(true);
      expect(Message.verifyPriority('      critical      ')).toBe(true);
      done();
    });

    it('should be case insensitive', (done) => {
      expect(Message.verifyPriority('NorMal')).toBe(true);
      expect(Message.verifyPriority('NORmal')).toBe(true);
      expect(Message.verifyPriority('urGENT')).toBe(true);
      expect(Message.verifyPriority('CRITICAL')).toBe(true);
      done();
    });
  });
});
