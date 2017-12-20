import { VERIFY_AUTH_LOADING, VERIFY_AUTH_SUCCESS,
  VERIFY_AUTH_FAILURE, SIGNIN_SUCCESS, SIGNUP_SUCCESS,
  LOGOUT_USER } from '../../../../../constants';

import authFailed from '../../../../../reducers/auth/status/authFailed';

describe('authFailed reducer', () => {
  const state = false;
  const action = {};
  test('should handle different action types correctly', () => {
    action.type = SIGNIN_SUCCESS;
    expect(authFailed(state, action))
    .toBe(false);

    action.type = SIGNUP_SUCCESS;
    expect(authFailed(state, action))
    .toBe(false);

    action.type = VERIFY_AUTH_LOADING;
    expect(authFailed(undefined, action))
    .toBe(false);

    action.type = VERIFY_AUTH_SUCCESS;
    expect(authFailed(state, action))
    .toBe(false);

    action.type = VERIFY_AUTH_FAILURE;
    expect(authFailed(state, action))
    .toBe(true);

    action.type = LOGOUT_USER;
    expect(authFailed(state, action))
    .toBe(true);

    action.type = 'SOME_UNRELATED_ACTION';
    expect(authFailed(state, action))
    .toBe(state);
  });
});
