import {
  GET_GROUP_MESSAGES_LOADING,
  GET_GROUP_MESSAGES_SUCCESS,
  GET_GROUP_MESSAGES_FAILURE,
  LOGOUT_USER
} from '../../../../constants';

import messagesLoading from '../../../../reducers/group/messagesLoading';

describe('messagesLoading reducer', () => {
  test('should handle different action types correctly', () => {
    const action = {};

    const state = false;

    action.type = GET_GROUP_MESSAGES_LOADING;
    expect(messagesLoading(state, action)).toBe(true);
    expect(messagesLoading(undefined, action)).toBe(true);

    action.type = GET_GROUP_MESSAGES_SUCCESS;
    expect(messagesLoading(state, action)).toBe(false);

    action.type = GET_GROUP_MESSAGES_FAILURE;
    expect(messagesLoading(state, action)).toBe(false);

    action.type = 'SOME_RANDOM_ACTION';
    expect(messagesLoading(state, action)).toEqual(state);
  });
});