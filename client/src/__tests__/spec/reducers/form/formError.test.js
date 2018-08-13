import {
  SIGNIN_LOADING, SIGNIN_SUCCESS,
  SIGNIN_FAILURE, SIGNUP_LOADING, SIGNUP_SUCCESS,
  SIGNUP_FAILURE, CLEAR_FORM_ERROR
} from '../../../../constants';

import errorMessage from '../../../../reducers/auth/form/errorMessage';

describe('errorMessage reducer', () => {
  const action = {
    error: 'Username/Password incorrect'
  };

  const state = null;

  test('should return null for SIGNIN_LOADING action type',
  () => {
    action.type = SIGNIN_LOADING;
    expect(errorMessage(state, action)).toBe(null);
    expect(errorMessage(undefined, action)).toBe(null);
  });

  test('should return null for SIGNIN_SUCCESS action type',
  () => {
    action.type = SIGNIN_SUCCESS;
    expect(errorMessage(state, action)).toBe(null);
  });

  test('should return error string for SIGNIN_LOADING action type',
  () => {
    action.type = SIGNIN_FAILURE;
    expect(errorMessage(state, action)).toBe(action.error);
  });

  test('should return null for SIGNUP_LOADING action type',
  () => {
    action.type = SIGNUP_LOADING;
    expect(errorMessage(state, action)).toBe(null);
    expect(errorMessage(undefined, action)).toBe(null);
  });

  test('should return null for SIGNUP_SUCCESS action type',
  () => {
    action.type = SIGNUP_SUCCESS;
    expect(errorMessage(state, action)).toBe(null);
  });

  test('should return error string for SIGNUP_FAILURE action type',
  () => {
    action.type = SIGNUP_FAILURE;
    expect(errorMessage(state, action)).toBe(action.error);
  });

  test('should return null for CLEAR_FORM_ERROR action type',
  () => {
    action.type = CLEAR_FORM_ERROR;
    expect(errorMessage(state, action)).toBe(null);
  });

  test('should return current state for other action types',
  () => {
    action.type = 'SOME_RANDOM_ACTION';
    expect(errorMessage(state, action)).toEqual(state);
  });
});
