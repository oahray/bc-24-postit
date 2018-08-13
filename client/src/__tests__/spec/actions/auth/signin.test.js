import { mock, mockStore } from '../../../../__mocks__/mockConfig';
import {
  signinUser, SIGNIN_SUCCESS,
  SIGNIN_LOADING, SIGNIN_FAILURE
} from '../../../../actions/index.js';

describe('signinUser action creator', () => {
  test(`dispatches an action with type SIGNIN_SUCCESS
  when api request is successful`,
  () => {
    const store = mockStore({ user: {} });
    const responseBody = {
      message: 'Welcome back ray',
      user: {
        id: 2,
        username: 'ray',
        about: 'New to Postit',
        email: 'ray@example.com'
      }
    };

    // mocks the post request
    mock.onPost().replyOnce(200, {
      data: responseBody
    });

    store.dispatch(
      signinUser(responseBody.user.username, 'mypassword')
    ).then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(SIGNIN_LOADING);
        expect(actions[1].type).toBe(SIGNIN_SUCCESS);
      });
  });

  test(`dispatches an action with type 
  SIGNIN_FAILURE when api request fails`,
  () => {
    const store = mockStore({ user: {} });
    const responseBody = {
      error: 'Password is required'
    };

    // mock the post request
    mock.onPost().replyOnce(400, responseBody);

    store.dispatch(signinUser(undefined, 'testpassword'))
    .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[1].type).toBe(SIGNIN_FAILURE);
      });
  });
});
