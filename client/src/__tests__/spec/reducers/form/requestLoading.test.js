import {
  SIGNIN_LOADING, SIGNIN_SUCCESS,
  SIGNIN_FAILURE, SIGNUP_LOADING, SIGNUP_SUCCESS,
  SIGNUP_FAILURE
} from '../../../../constants';

import requestLoading from '../../../../reducers/auth/form/requestLoading';

describe('requestLoading reducer', () => {
  test('should handle different action types correctly', () => {
    const action = {};

    const state = false;

    action.type = SIGNIN_LOADING;
    expect(requestLoading(state, action)).toBe(true);
    expect(requestLoading(undefined, action)).toBe(true);

    action.type = SIGNIN_SUCCESS;
    expect(requestLoading(state, action)).toBe(false);

    action.type = SIGNIN_FAILURE;
    expect(requestLoading(state, action)).toBe(false);

    action.type = SIGNUP_LOADING;
    expect(requestLoading(state, action)).toBe(true);
    expect(requestLoading(undefined, action)).toBe(true);

    action.type = SIGNUP_SUCCESS;
    expect(requestLoading(state, action)).toBe(false);

    action.type = SIGNUP_FAILURE;
    expect(requestLoading(state, action)).toBe(false);

    action.type = 'SOME_RANDOM_ACTION';
    expect(requestLoading(state, action)).toEqual(state);
  });
});