import {
  SIGNIN_LOADING, SIGNIN_SUCCESS,
  SIGNIN_FAILURE, SIGNUP_LOADING, SIGNUP_SUCCESS,
  SIGNUP_FAILURE
} from '../../../../constants';

import requestFailed from '../../../../reducers/auth/form/requestFailed';

describe('requestFailed reducer', () => {
  test('should handle different action types correctly', () => {
    const action = {};

    const state = false;

    action.type = SIGNIN_LOADING;
    expect(requestFailed(state, action)).toBe(false);
    expect(requestFailed(undefined, action)).toBe(false);

    action.type = SIGNIN_SUCCESS;
    expect(requestFailed(state, action)).toBe(false);

    action.type = SIGNIN_FAILURE;
    expect(requestFailed(state, action)).toBe(true);

    action.type = SIGNUP_LOADING;
    expect(requestFailed(state, action)).toBe(false);
    expect(requestFailed(undefined, action)).toBe(false);

    action.type = SIGNUP_SUCCESS;
    expect(requestFailed(state, action)).toBe(false);

    action.type = SIGNUP_FAILURE;
    expect(requestFailed(state, action)).toBe(true);

    action.type = 'SOME_RANDOM_ACTION';
    expect(requestFailed(state, action)).toEqual(state);
  });
});
