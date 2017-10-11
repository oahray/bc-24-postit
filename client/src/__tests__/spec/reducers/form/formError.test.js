import {
  SIGNIN_LOADING, SIGNIN_SUCCESS,
  SIGNIN_FAILURE, SIGNUP_LOADING, SIGNUP_SUCCESS,
  SIGNUP_FAILURE, CLEAR_FORM_ERROR
} from '../../../../constants';

import errorMessage from '../../../../reducers/auth/form/errorMessage';

describe('errorMessage reducer', () => {
  test('should handle different action types correctly', () => {
    const action = {
      error: 'Username/Password incorrect'
    };

    const state = null;

    action.type = SIGNIN_LOADING;
    expect(errorMessage(state, action)).toBe(null);
    expect(errorMessage(undefined, action)).toBe(null);

    action.type = SIGNIN_SUCCESS;
    expect(errorMessage(state, action)).toBe(null);

    action.type = SIGNIN_FAILURE;
    expect(errorMessage(state, action)).toBe(action.error);

    action.type = SIGNUP_LOADING;
    expect(errorMessage(state, action)).toBe(null);
    expect(errorMessage(undefined, action)).toBe(null);

    action.type = SIGNUP_SUCCESS;
    expect(errorMessage(state, action)).toBe(null);

    action.type = SIGNUP_FAILURE;
    expect(errorMessage(state, action)).toBe(action.error);

    action.type = CLEAR_FORM_ERROR;
    expect(errorMessage(state, action)).toBe(null);

    action.type = 'SOME_RANDOM_ACTION';
    expect(errorMessage(state, action)).toEqual(state);
  });
});
