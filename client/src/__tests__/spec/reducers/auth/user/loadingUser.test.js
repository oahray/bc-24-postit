import { SIGNUP_LOADING, SIGNUP_SUCCESS,
  SIGNUP_FAILURE, SIGNIN_LOADING, SIGNIN_SUCCESS,
  SIGNIN_FAILURE } from '../../../../../constants';

import loadingUser from '../../../../../reducers/auth/user/loadingUser';

describe('loadingUser reducer', () => {
  const state = false;
  const action = {};
  test('should return true for SIGNIN_LOADING action type',
  () => {
    action.type = SIGNIN_LOADING;
    expect(loadingUser(state, action))
    .toBe(true);
  });

  test('should return false for SIGNIN_SUCCESS action type',
  () => {
    action.type = SIGNIN_SUCCESS;
    expect(loadingUser(state, action))
    .toBe(false);
  });

  test('should return false for SIGNIN_FAILURE action type',
  () => {
    action.type = SIGNIN_FAILURE;
    expect(loadingUser(state, action))
    .toBe(false);
  });

  test('should return true for SIGNUP_LOADING action type',
  () => {
    action.type = SIGNUP_LOADING;
    expect(loadingUser(undefined, action))
    .toBe(true);
  });

  test('should return false for SIGNUP_SUCCESS action type',
  () => {
    action.type = SIGNUP_SUCCESS;
    expect(loadingUser(state, action))
    .toBe(false);
  });

  test('should return false for SIGNUP_FAILURE action type',
  () => {
    action.type = SIGNUP_FAILURE;
    expect(loadingUser(state, action))
    .toBe(false);
  });

  test('should return curent state value for other action types',
  () => {
    action.type = 'SOME_UNRELATED_ACTION';
    expect(loadingUser(state, action))
    .toBe(state);
  });
});
