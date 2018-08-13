import { mock, mockStore } from '../../../../__mocks__/mockConfig';
import {
  signupUser, SIGNUP_LOADING,
  SIGNUP_SUCCESS, SIGNUP_FAILURE
} from '../../../../actions/index.js';

describe('signupUser action creator', () => {
  test(`dispatches an action with type SIGNUP_SUCCESS
  when api request is successful`,
  () => {
    const store = mockStore({ user: {} });
    const responseBody = {
      message: 'Welcome ray',
      user: {
        id: 2,
        username: 'ray',
        about: 'New to Postit',
        email: 'ray@example.com'
      }
    };

    // mocks the post request
    mock.onPost().replyOnce(201, {
      data: responseBody
    });

    store.dispatch(
      signupUser(responseBody.user.username, 'mypassword',
      responseBody.user.email))
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(SIGNUP_LOADING);
        expect(actions[1].type).toBe(SIGNUP_SUCCESS);
      });
  });

  test(`dispatches an action with type SIGNUP_FAILURE
  when api request fails`,
  () => {
    const store = mockStore({ user: {} });
    const responseBody = {
      error: 'Username is required'
    };

    // mock the post request
    mock.onPost().replyOnce(400, {
      data: responseBody
    });

    store.dispatch(signupUser(undefined, 'testpassword', 'testemail@test.com'))
    .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(SIGNUP_LOADING);
        expect(actions[1].type).toBe(SIGNUP_FAILURE);
      });
  });
});
