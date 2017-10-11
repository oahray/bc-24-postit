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
  test('should handle different action types correctly', () => {
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

    action.type = SIGNIN_SUCCESS;
    expect(setUser(state, action)).toEqual(action.response.data.user);

    action.type = SIGNUP_SUCCESS;
    expect(setUser(state, action)).toEqual(action.response.data.user);

    action.type = VERIFY_AUTH_SUCCESS;
    expect(setUser(state, action)).not.toEqual(action.response.data.user);
    action.response.data.currentUser = action.response.data.user;
    expect(setUser(state, action)).toEqual(action.response.data.user);

    action.type = RESET_PASSWORD_SUCCESS;
    expect(setUser(state, action)).toEqual(action.response.data.user);

    action.type = EDIT_PROFILE_SUCCESS;
    const user = action.response.data.user;
    action.response.data.profile = { ...user };
    action.response.data.profile.about = 'About me has changed';
    expect(setUser(state, action)).not.toEqual(action.response.data.user);
    expect(setUser(state, action)).toEqual(action.response.data.profile);

    action.type = LOGOUT_USER;
    expect(setUser(state, action)).toEqual(null);

    action.type = 'UNKNOWN_ACTION'
    expect(setUser({}, action)).toEqual({});

  })
})