import {
  SIGNIN_LOADING, SIGNIN_SUCCESS,
  SIGNIN_FAILURE, SIGNUP_LOADING, SIGNUP_SUCCESS,
  SIGNUP_FAILURE
} from '../../../../constants';

import requestFailed from '../../../../reducers/auth/form/requestFailed';

describe('requestFailed reducer', () => {
  const action = {};
  const state = false;

  test('should return false for SIGNIN_LOADING action type',
  () => {
    action.type = SIGNIN_LOADING;
    expect(requestFailed(state, action)).toBe(false);
    expect(requestFailed(undefined, action)).toBe(false);
  });

  test('should return false for SIGNIN_SUCCESS action type',
  () => {
    action.type = SIGNIN_SUCCESS;
    expect(requestFailed(state, action)).toBe(false);
  });

  test('should return true for SIGNIN_FAILURE action type',
  () => {
    action.type = SIGNIN_FAILURE;
    expect(requestFailed(state, action)).toBe(true);
  });

  test('should return false for SIGNUP_LOADING action type',
  () => {
    action.type = SIGNUP_LOADING;
    expect(requestFailed(state, action)).toBe(false);
    expect(requestFailed(undefined, action)).toBe(false);
  });

  test('should return true for SIGNUP_SUCCESS action type',
  () => {
    action.type = SIGNUP_SUCCESS;
    expect(requestFailed(state, action)).toBe(false);
  });

  test('should return true for SIGNUP_FAILURE action type',
  () => {
    action.type = SIGNUP_FAILURE;
    expect(requestFailed(state, action)).toBe(true);
  });

  test('should return current state for other action types',
  () => {
    action.type = 'SOME_RANDOM_ACTION';
    expect(requestFailed(state, action)).toEqual(state);
  });
});
