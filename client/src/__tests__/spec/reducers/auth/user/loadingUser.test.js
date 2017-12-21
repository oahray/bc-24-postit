import { SIGNUP_LOADING, SIGNUP_SUCCESS,
  SIGNUP_FAILURE, SIGNIN_LOADING, SIGNIN_SUCCESS,
  SIGNIN_FAILURE } from '../../../../../constants';

import loadingUser from '../../../../../reducers/auth/user/loadingUser';

describe('loadingUser reducer', () => {
  const state = false;
  const action = {};
  test('should handle different action types correctly', () => {
    action.type = SIGNIN_LOADING;
    expect(loadingUser(state, action))
    .toBe(true);

    action.type = SIGNIN_SUCCESS;
    expect(loadingUser(state, action))
    .toBe(false);

    action.type = SIGNIN_FAILURE;
    expect(loadingUser(state, action))
    .toBe(false);

    action.type = SIGNUP_LOADING;
    expect(loadingUser(undefined, action))
    .toBe(true);

    action.type = SIGNUP_SUCCESS;
    expect(loadingUser(state, action))
    .toBe(false);

    action.type = SIGNUP_FAILURE;
    expect(loadingUser(state, action))
    .toBe(false);

    action.type = 'SOME_UNRELATED_ACTION';
    expect(loadingUser(state, action))
    .toBe(state);
  });
});
