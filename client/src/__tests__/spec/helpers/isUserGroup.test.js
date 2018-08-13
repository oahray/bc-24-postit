import isUserGroup from '../../../helpers/isUserGroup';

describe('isUserGroup function', () => {
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

  test('should return true when groupid is in group list', () => {
    expect(isUserGroup(groupList, 3)).toBe(false);
  });

  test('should return true when groupid is not in group list', () => {
    expect(isUserGroup(groupList, 5)).toBe(true);
  });
});
