import {
  GET_GROUP_MESSAGES_LOADING,
  GET_GROUP_MESSAGES_SUCCESS,
  GET_GROUP_MESSAGES_FAILURE,
} from '../../../../constants';

import messagesLoading from '../../../../reducers/group/messagesLoading';

describe('messagesLoading reducer', () => {
  const action = {};
  const state = false;

  test('should return true for GET_GROUP_MESSAGE_LOADING action type',
  () => {
    action.type = GET_GROUP_MESSAGES_LOADING;
    expect(messagesLoading(state, action)).toBe(true);
    expect(messagesLoading(undefined, action)).toBe(true);
  });

  test('should return false for GET_GROUP_MESSAGES_SUCCESS action type',
  () => {
    action.type = GET_GROUP_MESSAGES_SUCCESS;
    expect(messagesLoading(state, action)).toBe(false);
  });

  test('should return false for GET_GROUP_MESSAGES_FAILURE action type',
  () => {
    action.type = GET_GROUP_MESSAGES_FAILURE;
    expect(messagesLoading(state, action)).toBe(false);
  });

  test('should return current state for other action types',
  () => {
    action.type = 'SOME_RANDOM_ACTION';
    expect(messagesLoading(state, action)).toEqual(state);
  });
});
