import {
  GROUPS_LIST_SUCCESS, GROUPS_LIST_FAILURE,
  LOGOUT_USER
} from '../../../../constants';
import groupList from '../../../../reducers/group/list';

describe('groupList reducer', () => {
  test('should handle different action types correctly', () => {
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

    action.type = GROUPS_LIST_SUCCESS;
    expect(groupList(state, action)).toEqual(action.response.data.userGroups);
    expect(groupList(undefined, action)).toEqual(action.response.data.userGroups);

    action.type = GROUPS_LIST_FAILURE;
    expect(groupList(state, action)).toEqual([]);

    action.type = LOGOUT_USER;
    expect(groupList(state, action)).toEqual([]);

    action.type = 'SOME_RANDOM_ACTION';
    expect(groupList(state, action)).toEqual(state);
  });
});
