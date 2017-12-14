import { isUserGroup } from '../../../helpers/groupFunctions';

describe('isUserGroup function', () => {
  test('should return true when groupid is in group list', () => {
    const groupList = [
      {
        id: 2,
        name: 'My group one',
        description: '',
        type: 'public'
      },
      {
        id: 5,
        name: 'Friends',
        description: 'The closest ones',
        type: 'private'
      },
    ];

    expect(isUserGroup(groupList, 3)).toBe(false);
    expect(isUserGroup(groupList, 5)).toBe(true);
  });
});