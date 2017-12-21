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

  test('should handle different action types correctly', () => {
    action.type = SIGNIN_SUCCESS;
    expect(setToken(oldToken, action))
      .toBe(newToken);

    action.type = SIGNUP_SUCCESS;
    expect(setToken(oldToken, action))
      .toBe(newToken);

    action.type = VERIFY_AUTH_SUCCESS;
    expect(setToken(oldToken, action))
      .toBe(oldToken);

    action.type = RESET_PASSWORD_SUCCESS;
    expect(setToken(undefined, action))
      .toBe(newToken);

    action.type = LOGOUT_USER;
    expect(setToken(oldToken, action))
      .toBe(null);

    action.type = 'SOME_OTHER_CASE';
    expect(setToken(oldToken, action))
      .toBe(oldToken);
  });
});
