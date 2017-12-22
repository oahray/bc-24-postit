import { mock, mockStore } from '../../../../__mocks__/mockConfig';

import {
  verifyAuth
} from '../../../../actions/index.js';

import {
  VERIFY_AUTH_LOADING,
  VERIFY_AUTH_SUCCESS,
  VERIFY_AUTH_FAILURE
} from '../../../../constants';

describe('verifyAuth action creator', () => {
  test(`dispatches an action with type VERIFY_AUTH_SUCCESS
  when api request succeeds`,
  () => {
    const store = mockStore({ user: {} });
    const responseBody = {
      user: {
        id: 2,
        username: 'ray',
        about: 'New to Postit',
        email: 'ray@example.com'
      }
    };

    // mocks the post request
    mock.onGet().replyOnce(200, {
      data: responseBody
    });

    const expectedAction = {
      type: VERIFY_AUTH_SUCCESS,
      response: { data: responseBody }
    };

    store.dispatch(verifyAuth('validtoken')).then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe('VERIFY_AUTH_LOADING');
        expect(actions[1].type).toBe('VERIFY_AUTH_SUCCESS');
        expect(actions[1].response.data).toEqual(expectedAction.response);
      });
  });

  test(`dispatches an action with type VERIFY_AUTH_FAILURE
  when api request succeeds`, () => {
    const store = mockStore({ user: {} });
    const responseBody = {
      error: 'Invalid authentication'
    };

    // mock the post request
    mock.onGet().replyOnce(400, responseBody);

    store.dispatch(verifyAuth('invalidtoken')).then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(VERIFY_AUTH_LOADING);
        expect(actions[1].type).toBe(VERIFY_AUTH_FAILURE);
      });
  });
});
