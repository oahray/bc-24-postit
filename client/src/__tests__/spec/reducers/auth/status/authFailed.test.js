import { VERIFY_AUTH_LOADING, VERIFY_AUTH_SUCCESS,
  VERIFY_AUTH_FAILURE, SIGNIN_SUCCESS, SIGNUP_SUCCESS,
  LOGOUT_USER } from '../../../../../constants';

import authFailed from '../../../../../reducers/auth/status/authFailed';

describe('authFailed reducer', () => {
  const state = false;
  const action = {};
  test('should return false for action with SIGNIN_SUCCESS type',
  () => {
    action.type = SIGNIN_SUCCESS;
    expect(authFailed(state, action))
    .toBe(false);
  });

  test('should return false for action with SIGNUP_SUCCESS action',
  () => {
    action.type = SIGNUP_SUCCESS;
    expect(authFailed(state, action))
    .toBe(false);
  });

  test('should return false for action with VERIFY_AUTH_LOADING type',
  () => {
    action.type = VERIFY_AUTH_LOADING;
    expect(authFailed(undefined, action))
    .toBe(false);
  });

  test('should return false for action with VERIFY_AUTH_SUCCESS type',
  () => {
    action.type = VERIFY_AUTH_SUCCESS;
    expect(authFailed(state, action))
    .toBe(false);
  });

  test('should return true for action with VERIFY_AUTH_FAILURE type',
  () => {
    action.type = VERIFY_AUTH_FAILURE;
    expect(authFailed(state, action))
    .toBe(true);
  });

  test('should return true for action with LOGOUT_USER type',
  () => {
    action.type = LOGOUT_USER;
    expect(authFailed(state, action))
    .toBe(true);
  });

  test('should return current state for action with other action types',
  () => {
    action.type = 'SOME_UNRELATED_ACTION';
    expect(authFailed(state, action))
    .toBe(state);
  });
});
