import {
  GET_GROUP_MESSAGES_SUCCESS,
  GET_GROUP_MESSAGES_FAILURE,
  LOGOUT_USER,
  DELETE_GROUP_SUCCESS,
  EDIT_GROUP_INFO_SUCCESS,
  CREATE_GROUP_SUCCESS
} from '../../../../constants';
import selectedGroup from '../../../../reducers/group/selected';

describe('selectedGroup reducer', () => {
  const action = {
    response: {
      data: {
        group: {
          id: 5,
          name: 'my first group',
          description: '',
          type: 'public'
        }
      }
    }
  };

  const state = null;

  test('should return group object for CREATE_GROUP_SUCCESS action type',
  () => {
    action.type = CREATE_GROUP_SUCCESS;
    expect(selectedGroup(state, action))
    .toEqual(action.response.data.group);
    expect(selectedGroup(undefined, action))
    .toEqual(action.response.data.group);
  });

  test('should return group object for GET_GROUP_MESSAGES_SUCCESS action type',
  () => {
    action.type = GET_GROUP_MESSAGES_SUCCESS;
    expect(selectedGroup(state, action))
    .toEqual(action.response.data.group);
  });

  test('should return null for GET_GROUP_MESSAGES_FAILURE action type',
  () => {
    action.type = GET_GROUP_MESSAGES_FAILURE;
    expect(selectedGroup(state, action)).toEqual(null);
  });

  test('should return null for DELETE_GROUP_SUCCESS action type',
  () => {
    action.type = DELETE_GROUP_SUCCESS;
    expect(selectedGroup(state, action)).toEqual(null);
  });

  test('should return group object for EDIT_GROUP_INFO_SUCCESS action type',
  () => {
    action.type = EDIT_GROUP_INFO_SUCCESS;
    expect(selectedGroup(state, action))
    .toEqual(action.response.data.group);
  });

  test('should return null for LOGOUT_USER action type',
  () => {
    action.type = LOGOUT_USER;
    expect(selectedGroup(state, action)).toEqual(null);
  });

  test('should return current state for other action types',
  () => {
    action.type = 'SOME_RANDOM_ACTION';
    expect(selectedGroup(state, action)).toEqual(state);
  });
});
