import { VERIFY_AUTH_LOADING, VERIFY_AUTH_SUCCESS,
  VERIFY_AUTH_FAILURE } from '../../../../../constants';

import authLoading from '../../../../../reducers/auth/status/authLoading';

describe('authLoading reducer', () => {
  const state = false;
  const action = {};
  test('should return true for action with VERIFY_AUTH_LOADING type',
  () => {
    action.type = VERIFY_AUTH_LOADING;
    expect(authLoading(undefined, action))
    .toBe(true);
  });

  test('should return false for action with VERIFY_AUTH_SUCCESS type',
  () => {
    action.type = VERIFY_AUTH_SUCCESS;
    expect(authLoading(state, action))
    .toBe(false);
  });

  test('should return false for action with VERIFY_AUTH_FAILURE type',
  () => {
    action.type = VERIFY_AUTH_FAILURE;
    expect(authLoading(state, action))
    .toBe(false);
  });

  test('should return current state for action with other action types',
  () => {
    action.type = 'SOME_UNRELATED_ACTION';
    expect(authLoading(state, action))
    .toBe(state);
  });
});
