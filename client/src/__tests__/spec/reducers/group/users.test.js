import {
  GET_GROUP_USERS_SUCCESS,
  GET_GROUP_USERS_FAILURE, LOGOUT_USER
} from '../../../../constants';
import groupUsers from '../../../../reducers/group/users';

describe('groupUsers reducer', () => {
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

  test('should return array of users for GET_GROUP_USERS_SUCCESS action type',
  () => {
    action.type = GET_GROUP_USERS_SUCCESS;
    expect(groupUsers(state, action)).toEqual(action.response.data.users);
    expect(groupUsers(undefined, action)).toEqual(action.response.data.users);
  });

  test('should return empty array for GET_GROUP_USERS_FAILURE action type',
  () => {
    action.type = GET_GROUP_USERS_FAILURE;
    expect(groupUsers(state, action)).toEqual([]);
  });

  test('should return empty array for LOGOUT_USER action type',
  () => {
    action.type = LOGOUT_USER;
    expect(groupUsers(state, action)).toEqual([]);
  });

  test('should return current state for other action types',
  () => {
    action.type = 'SOME_RANDOM_ACTION';
    expect(groupUsers(state, action)).toEqual(state);
  });
});
