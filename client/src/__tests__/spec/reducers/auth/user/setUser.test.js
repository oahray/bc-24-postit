import {
  VERIFY_AUTH_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNIN_SUCCESS,
  LOGOUT_USER,
  RESET_PASSWORD_SUCCESS,
  EDIT_PROFILE_SUCCESS
} from '../../../../../constants';

import setUser from '../../../../../reducers/auth/user/setUser';

describe('setUser reducer', () => {
  const action = {
    response: {
      data: {
        user: {
          id: 4,
          username: 'mock-user',
          email: 'mock-user@example.com',
          about: 'New to postit'
        }
      }
    }
  };

  const state = undefined;

  test(`should return user details in response
  data for SIGNIN_SUCCESS action type`,
  () => {
    action.type = SIGNIN_SUCCESS;
    expect(setUser(state, action))
      .toEqual(action.response.data.user);
  });

  test(`should return user details in response
  data for SIGNUP_SUCCESS action type`,
  () => {
    action.type = SIGNUP_SUCCESS;
    expect(setUser(state, action))
      .toEqual(action.response.data.user);
  });

  test(`should return current user details in response
  data for VERIFY_AUTH_SUCCESS action type`,
  () => {
    action.type = VERIFY_AUTH_SUCCESS;
    expect(setUser(state, action)).not
      .toEqual(action.response.data.user);
    action.response.data.currentUser = action.response.data.user;
    expect(setUser(state, action))
      .toEqual(action.response.data.user);
  });

  test(`should return user details in response
  data for RESET_PASSWORD_SUCCESS action type`,
  () => {
    action.type = RESET_PASSWORD_SUCCESS;
    expect(setUser(state, action))
      .toEqual(action.response.data.user);
  });

  test(`should return user profile in response data
  for RESET_PASSWORD_LOADING action type`,
  () => {
    action.type = EDIT_PROFILE_SUCCESS;
    const user = action.response.data.user;
    action.response.data.profile = { ...user };
    action.response.data.profile.about = 'About me has changed';
    expect(setUser(state, action)).not
      .toEqual(action.response.data.user);
    expect(setUser(state, action))
      .toEqual(action.response.data.profile);
  });

  test(`should return null in response data
  for LOGOUT_USER action type`,
  () => {
    action.type = LOGOUT_USER;
    expect(setUser(state, action)).toEqual(null);
  });

  test('should return empty object for other action types',
  () => {
    action.type = 'UNKNOWN_ACTION';
    expect(setUser({}, action)).toEqual({});
  });
});
