import {
  GET_GROUP_MESSAGES_LOADING,
  GET_GROUP_MESSAGES_SUCCESS,
  GET_GROUP_MESSAGES_FAILURE,
  LOGOUT_USER
} from '../../../../constants';

import messagesFailed from '../../../../reducers/group/messagesFailed';

describe('messagesFailed reducer', () => {
  const action = {};
  const state = false;

  test('should return false for GET_GROUP_MESSAGES_LOADING action type',
  () => {
    action.type = GET_GROUP_MESSAGES_LOADING;
    expect(messagesFailed(state, action)).toBe(false);
    expect(messagesFailed(undefined, action)).toBe(false);
  });

  test('should return false for GET_GROUP_MESSAGES_SUCCESS action type',
  () => {
    action.type = GET_GROUP_MESSAGES_SUCCESS;
    expect(messagesFailed(state, action)).toBe(false);
  });

  test('should return true for GET_GROUP_MESSAGES_FAILURE action type',
  () => {
    action.type = GET_GROUP_MESSAGES_FAILURE;
    expect(messagesFailed(state, action)).toBe(true);
  });

  test('should return false for LOGOUT_USER action type',
  () => {
    action.type = LOGOUT_USER;
    expect(messagesFailed(state, action)).toBe(false);
  });

  test('should return current state for other action types',
  () => {
    action.type = 'SOME_RANDOM_ACTION';
    expect(messagesFailed(state, action)).toEqual(state);
  });
});
