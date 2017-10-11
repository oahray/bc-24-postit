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
  test('should handle different action types correctly', () => {
    const action = {};
    const state = false;

    action.type = REQUEST_RESET_LOADING;
    expect(requestResetLoading(state, action)).toBe(true);

    action.type = REQUEST_RESET_SUCCESS;
    expect(requestResetLoading(undefined, action)).toBe(false);

    action.type = REQUEST_RESET_FAILURE;
    expect(requestResetLoading(state, action)).toBe(false);

    action.type = 'UNKNOWN_ACTION';
    expect(requestResetLoading(state, action)).toBe(state);
  });
});

describe('requestResetMessage', () => {
  test('should handle different action types correctly', () => {
    const action = {
      response: {
        data: {
          message: 'An email with reset instructions has been sent'
        }
      },
      error: 'Error sending recovery email. Try again later'
    };
    const state = {};

    action.type = REQUEST_RESET_LOADING;
    expect(requestResetMessage(undefined, action)).toEqual({});
    expect(requestResetMessage(state, action)).toEqual({});

    action.type = REQUEST_RESET_SUCCESS;
    expect(requestResetMessage(state, action)).toEqual({
      requestResetSuccess: true,
      requestResetMessage: action.response.data.message
    });

    action.type = REQUEST_RESET_FAILURE;
    expect(requestResetMessage(state, action)).toEqual({
      requestResetSuccess: false,
      requestResetMessage: action.error
    });

    action.type = CLEAR_REQUEST_RESET_MESSAGE;
    expect(requestResetMessage(state, action)).toEqual({});

    action.type = 'UNKNOWN ACTION';
    expect(requestResetMessage(state, action)).toEqual(state);
  });
});

describe('resetPasswordLoading', () => {
  test('should handle different action types correctly', () => {
    const action = {};
    const state = false;

    action.type = RESET_PASSWORD_LOADING;
    expect(resetPasswordLoading(state, action)).toBe(true);

    action.type = RESET_PASSWORD_SUCCESS;
    expect(resetPasswordLoading(undefined, action)).toBe(false);

    action.type = RESET_PASSWORD_FAILED;
    expect(resetPasswordLoading(state, action)).toBe(false);

    action.type = 'UNKNOWN_ACTION';
    expect(resetPasswordLoading(state, action)).toBe(state);
  });
});

describe('resetPasswordError', () => {
  test('should handle different action types correctly', () => {
    const action = {};
    const state = false;

    action.type = RESET_PASSWORD_LOADING;
    expect(resetPasswordError(state, action)).toBe(null);

    action.type = RESET_PASSWORD_FAILED;
    expect(resetPasswordError(undefined, action)).toBe(action.error);

    action.type = 'UNKNOWN_ACTION';
    expect(resetPasswordError(state, action)).toBe(state);
  });
});

