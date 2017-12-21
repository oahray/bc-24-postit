import {
  GET_GROUP_MESSAGES_LOADING,
  GET_GROUP_MESSAGES_SUCCESS,
  GET_GROUP_MESSAGES_FAILURE,
  LOGOUT_USER
} from '../../../../constants';

import messagesFailed from '../../../../reducers/group/messagesFailed';

describe('messagesFailed reducer', () => {
  test('should handle different action types correctly', () => {
    const action = {};

    const state = false;

    action.type = GET_GROUP_MESSAGES_LOADING;
    expect(messagesFailed(state, action)).toBe(false);
    expect(messagesFailed(undefined, action)).toBe(false);

    action.type = GET_GROUP_MESSAGES_SUCCESS;
    expect(messagesFailed(state, action)).toBe(false);

    action.type = GET_GROUP_MESSAGES_FAILURE;
    expect(messagesFailed(state, action)).toBe(true);

    action.type = LOGOUT_USER;
    expect(messagesFailed(state, action)).toBe(false);

    action.type = 'SOME_RANDOM_ACTION';
    expect(messagesFailed(state, action)).toEqual(state);
  });
});
