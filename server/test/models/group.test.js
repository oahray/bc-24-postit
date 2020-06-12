import expect from 'expect';
import { Group, Message } from '../../models';
import { doBeforeAll } from '../seeders/testHooks';

describe('Group model', () => {
  doBeforeAll();

  it('should create a Group instance', (done) => {
    Group.create({
      name: 'My first test group',
      type: 'private',
      description: '',
      createdBy: 'User1'
    })
    .then((group) => {
      expect(group).toExist;
      expect(group.name).toBe('My first test group');
      expect(group.type).toBe('private');
      done();
    }).catch(err => done(err));
  });

  it('should be the class of the created instance', (done) => {
    Group.create({
      name: 'My test group',
      description: '',
      createdBy: 'User2',
      type: 'public'
    })
    .then((group) => {
      expect(group).toExist;
      expect(group instanceof Group).toBe(true);
      done();
    }).catch(err => done(err));
  });
});
