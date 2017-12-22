import {
  SIGNIN_LOADING, SIGNIN_SUCCESS,
  SIGNIN_FAILURE, SIGNUP_LOADING, SIGNUP_SUCCESS,
  SIGNUP_FAILURE
} from '../../../../constants';

import requestLoading from '../../../../reducers/auth/form/requestLoading';

describe('requestLoading reducer', () => {
  const action = {};
  const state = false;

  test('should return true for SIGNIN_LOADING action type',
  () => {
    action.type = SIGNIN_LOADING;
    expect(requestLoading(state, action)).toBe(true);
    expect(requestLoading(undefined, action)).toBe(true);
  });

  test('should return false for SIGNIN_SUCCESS action type',
  () => {
    action.type = SIGNIN_SUCCESS;
    expect(requestLoading(state, action)).toBe(false);
  });

  test('should return false for SIGNIN_FAILURE action type',
  () => {
    action.type = SIGNIN_FAILURE;
    expect(requestLoading(state, action)).toBe(false);
  });

  test('should return true for SIGNUP_LOADING action type',
  () => {
    action.type = SIGNUP_LOADING;
    expect(requestLoading(state, action)).toBe(true);
    expect(requestLoading(undefined, action)).toBe(true);
  });

  test('should return false for SIGNUP_SUCCESS action type',
  () => {
    action.type = SIGNUP_SUCCESS;
    expect(requestLoading(state, action)).toBe(false);
  });

  test('should return false for SIGNUP_FAILURE action type',
  () => {
    action.type = SIGNUP_FAILURE;
    expect(requestLoading(state, action)).toBe(false);
  });

  test('should return current state for other action types',
  () => {
    action.type = 'SOME_RANDOM_ACTION';
    expect(requestLoading(state, action)).toEqual(state);
  });
});
