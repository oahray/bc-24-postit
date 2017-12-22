import {
  GROUPS_LIST_SUCCESS, GROUPS_LIST_FAILURE,
  LOGOUT_USER
} from '../../../../constants';
import groupList from '../../../../reducers/group/list';

describe('groupList reducer', () => {
  const action = {
    response: {
      data: {
        userGroups: [
          {
            id: 5,
            name: 'my first group',
            description: '',
            type: 'public'
          }
        ]
      }
    }
  };

  const state = [];

  test('should return array of groups for GROUPS_LIST_SUCCESS action type',
  () => {
    action.type = GROUPS_LIST_SUCCESS;
    expect(groupList(state, action))
      .toEqual(action.response.data.userGroups);
    expect(groupList(undefined, action))
      .toEqual(action.response.data.userGroups);
  });

  test('should return empty array for GROUPS_LIST_FAILURE action type',
  () => {
    action.type = GROUPS_LIST_FAILURE;
    expect(groupList(state, action)).toEqual([]);
  });

  test('should return empty array for LOGOUT_USER action type',
  () => {
    action.type = LOGOUT_USER;
    expect(groupList(state, action)).toEqual([]);
  });

  test('should return current state for other action types',
  () => {
    action.type = 'SOME_RANDOM_ACTION';
    expect(groupList(state, action)).toEqual(state);
  });
});
