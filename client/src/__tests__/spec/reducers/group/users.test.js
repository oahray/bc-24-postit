import {
  GET_GROUP_USERS_SUCCESS,
  GET_GROUP_USERS_FAILURE, LOGOUT_USER
} from '../../../../constants';
import groupUsers from '../../../../reducers/group/users';

describe('groupUsers reducer', () => {
  test('should handle different action types correctly', () => {
    const action = {
      response: {
        data: {
          users: [
            {
              id: 3,
              username: 'randomdude',
              email: 'randomdude@example.com',
              about: 'new to Postit',
            },
            {
              id: 7,
              username: 'stranger',
              email: 'stranger@example.com',
              about: '',
            }
          ]
        }
      }
    };

    const state = [];

    action.type = GET_GROUP_USERS_SUCCESS;
    expect(groupUsers(state, action)).toEqual(action.response.data.users);
    expect(groupUsers(undefined, action)).toEqual(action.response.data.users);

    action.type = GET_GROUP_USERS_FAILURE;
    expect(groupUsers(state, action)).toEqual([]);

    action.type = LOGOUT_USER;
    expect(groupUsers(state, action)).toEqual([]);

    action.type = 'SOME_RANDOM_ACTION';
    expect(groupUsers(state, action)).toEqual(state);
  });
});
