import {
  VERIFY_AUTH_SUCCESS, VERIFY_AUTH_FAILURE, SIGNUP_SUCCESS,
  SIGNIN_SUCCESS, LOGOUT_USER, RESET_PASSWORD_SUCCESS
} from '../../../../../constants';

import authStatus from '../../../../../reducers/auth/status/authStatus';

describe('authStatus reducer', () => {
  const state = false;
  const action = {};
  test('should handle different action types correctly', () => {
    action.type = SIGNIN_SUCCESS;
    expect(authStatus(state, action))
    .toBe(true);

    action.type = SIGNUP_SUCCESS;
    expect(authStatus(state, action))
    .toBe(true);

    action.type = VERIFY_AUTH_SUCCESS;
    expect(authStatus(undefined, action))
    .toBe(true);

    action.type = VERIFY_AUTH_FAILURE;
    expect(authStatus(state, action))
    .toBe(false);

    action.type = RESET_PASSWORD_SUCCESS;
    expect(authStatus(state, action))
    .toBe(true);

    action.type = LOGOUT_USER;
    expect(authStatus(state, action))
    .toBe(false);

    action.type = 'SOME_UNRELATED_ACTION';
    expect(authStatus(state, action))
    .toBe(state);
  });
});
