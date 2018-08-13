import {
  VERIFY_AUTH_SUCCESS, VERIFY_AUTH_FAILURE, SIGNUP_SUCCESS,
  SIGNIN_SUCCESS, LOGOUT_USER, RESET_PASSWORD_SUCCESS
} from '../../../../../constants';

import authStatus from '../../../../../reducers/auth/status/authStatus';

describe('authStatus reducer', () => {
  const state = false;
  const action = {};
  test('should return true for action with type SIGNIN_SUCCESS',
  () => {
    action.type = SIGNIN_SUCCESS;
    expect(authStatus(state, action))
    .toBe(true);
  });

  test('should return true for action with type SIGNUP_SUCCESS',
  () => {
    action.type = SIGNUP_SUCCESS;
    expect(authStatus(state, action))
    .toBe(true);
  });

  test('should return true for action with type VERIFY_AUTH_SUCCESS',
  () => {
    action.type = VERIFY_AUTH_SUCCESS;
    expect(authStatus(undefined, action))
    .toBe(true);
  });

  test('should return false for action with type VERIFY_AUTH_FAILURE',
  () => {
    action.type = VERIFY_AUTH_FAILURE;
    expect(authStatus(state, action))
    .toBe(false);
  });

  test('should return true for action with type SIGNIN_SUCCESS',
  () => {
    action.type = RESET_PASSWORD_SUCCESS;
    expect(authStatus(state, action))
    .toBe(true);
  });

  test('should return false for action with type LOGOUT_USER',
  () => {
    action.type = LOGOUT_USER;
    expect(authStatus(state, action))
    .toBe(false);
  });

  test('should return current state for other action types',
  () => {
    action.type = 'SOME_UNRELATED_ACTION';
    expect(authStatus(state, action))
    .toBe(state);
  });
});
