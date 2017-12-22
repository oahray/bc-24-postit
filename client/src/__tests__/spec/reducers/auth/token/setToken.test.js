import {
  VERIFY_AUTH_SUCCESS, SIGNUP_SUCCESS, SIGNIN_SUCCESS,
  LOGOUT_USER, RESET_PASSWORD_SUCCESS
} from '../../../../../constants';

import setToken from '../../../../../reducers/auth/token/setToken';

describe('setToken reducer', () => {
  const newToken = 'new-token-string';
  const oldToken = 'old-token-string';
  localStorage.__STORE__['x-auth'] = oldToken;
  const action = {
    response: {
      headers: {
        'x-auth': newToken
      },
    }
  };

  test('should return new token string for SIGNIN_SUCCESS action type',
  () => {
    action.type = SIGNIN_SUCCESS;
    expect(setToken(oldToken, action))
      .toBe(newToken);
  });

  test('should return new token string for SIGNUP_SUCCESS action type',
  () => {
    action.type = SIGNUP_SUCCESS;
    expect(setToken(oldToken, action))
      .toBe(newToken);
  });

  test('should return new token for VERIFY_AUTH_SUCCESS action type',
  () => {
    action.type = VERIFY_AUTH_SUCCESS;
    expect(setToken(oldToken, action))
      .toBe(oldToken);
  });

  test('should return new token string for RESET_PASSWORD_SUCCESS action type',
  () => {
    action.type = RESET_PASSWORD_SUCCESS;
    expect(setToken(undefined, action))
      .toBe(newToken);
  });

  test('should return null for LOGOUT_USER action type',
  () => {
    action.type = LOGOUT_USER;
    expect(setToken(oldToken, action))
      .toBe(null);
  });

  test('should return current state for other action types',
  () => {
    action.type = 'SOME_OTHER_CASE';
    expect(setToken(oldToken, action))
      .toBe(oldToken);
  });
});
