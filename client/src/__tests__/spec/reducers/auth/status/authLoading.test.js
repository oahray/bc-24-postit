import { VERIFY_AUTH_LOADING, VERIFY_AUTH_SUCCESS,
  VERIFY_AUTH_FAILURE } from '../../../../../constants';

import authLoading from '../../../../../reducers/auth/status/authLoading';

describe('authLoading reducer', () => {
  const state = false;
  const action = {};
  test('should handle differnt actions correctly', () => {
    action.type = VERIFY_AUTH_LOADING;
    expect(authLoading(undefined, action))
    .toBe(true);

    action.type = VERIFY_AUTH_SUCCESS;
    expect(authLoading(state, action))
    .toBe(false);

    action.type = VERIFY_AUTH_FAILURE;
    expect(authLoading(state, action))
    .toBe(false);

    action.type = 'SOME_UNRELATED_ACTION';
    expect(authLoading(state, action))
    .toBe(state);
  });
});
