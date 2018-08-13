import {
  REQUEST_RESET_LOADING,
  REQUEST_RESET_SUCCESS,
  REQUEST_RESET_FAILURE,
  CLEAR_REQUEST_RESET_MESSAGE,
  RESET_PASSWORD_LOADING,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED
} from '../../../../../constants';

import {
  requestResetLoading,
  requestResetMessage,
  resetPasswordLoading,
  resetPasswordError
} from '../../../../../reducers/auth/user/resetPassword';

describe('requestResetLoading', () => {
  const action = {};
  const state = false;

  test('should return true for LOGOUT_USER action type',
  () => {
    action.type = REQUEST_RESET_LOADING;
    expect(requestResetLoading(state, action)).toBe(true);
  });

  test('should return false for REQUEST_RESET_SUCCESS action type',
  () => {
    action.type = REQUEST_RESET_SUCCESS;
    expect(requestResetLoading(undefined, action)).toBe(false);
  });

  test('should return false for REQUEST_RESET_FAILURE action type',
  () => {
    action.type = REQUEST_RESET_FAILURE;
    expect(requestResetLoading(state, action)).toBe(false);
  });

  test('should return current state for other action types',
  () => {
    action.type = 'UNKNOWN_ACTION';
    expect(requestResetLoading(state, action)).toBe(state);
  });
});

describe('requestResetMessage', () => {
  const action = {
    response: {
      data: {
        message: 'An email with reset instructions has been sent'
      }
    },
    error: 'Error sending recovery email. Try again later'
  };
  const state = {};

  test('should return an empty object for REQUEST_RESET_LOADING action type',
  () => {
    action.type = REQUEST_RESET_LOADING;
    expect(requestResetMessage(undefined, action)).toEqual({});
    expect(requestResetMessage(state, action)).toEqual({});
  });

  test(`should return a message object with request status
  set to true for REQUEST_RESET_LOADING action type`,
  () => {
    action.type = REQUEST_RESET_SUCCESS;
    expect(requestResetMessage(state, action)).toEqual({
      requestResetSuccess: true,
      requestResetMessage: action.response.data.message
    });
  });

  test(`should return a message object with request status
  set to false for REQUEST_RESET_FAILURE action type`,
  () => {
    action.type = REQUEST_RESET_FAILURE;
    expect(requestResetMessage(state, action)).toEqual({
      requestResetSuccess: false,
      requestResetMessage: action.error
    });
  });

  test(`should return an empty object with request status
  for CLEAR_REQUEST_RESET_MESSAGE action type`,
  () => {
    action.type = CLEAR_REQUEST_RESET_MESSAGE;
    expect(requestResetMessage(state, action)).toEqual({});
  });

  test('should return current state for other action types',
  () => {
    action.type = 'UNKNOWN ACTION';
    expect(requestResetMessage(state, action)).toEqual(state);
  });
});

describe('resetPasswordLoading', () => {
  const action = {};
  const state = false;

  test('should return true for RESET_PASSWORD_LOADING action type',
  () => {
    action.type = RESET_PASSWORD_LOADING;
    expect(resetPasswordLoading(state, action)).toBe(true);
  });

  test('should return true for RESET_PASSWORD_SUCCESS action type',
  () => {
    action.type = RESET_PASSWORD_SUCCESS;
    expect(resetPasswordLoading(undefined, action)).toBe(false);
  });

  test('should return true for RESET_PASSWORD_FAILED action type',
  () => {
    action.type = RESET_PASSWORD_FAILED;
    expect(resetPasswordLoading(state, action)).toBe(false);
  });

  test('should return true for other action types',
  () => {
    action.type = 'UNKNOWN_ACTION';
    expect(resetPasswordLoading(state, action)).toBe(state);
  });
});

describe('resetPasswordError', () => {
  const action = {};
  const state = false;

  test('should return null for RESET_PASSWORD_LOADING action type',
  () => {
    action.type = RESET_PASSWORD_LOADING;
    expect(resetPasswordError(state, action)).toBe(null);
  });

  test('should return error string for RESET_PASSWORD_LOADING action type',
  () => {
    action.type = RESET_PASSWORD_FAILED;
    expect(resetPasswordError(undefined, action)).toBe(action.error);
  });

  test('should return current state for other action types',
  () => {
    action.type = 'UNKNOWN_ACTION';
    expect(resetPasswordError(state, action)).toBe(state);
  });
});

