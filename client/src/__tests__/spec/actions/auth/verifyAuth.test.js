import axios from 'axios';

import { mock, middlewares, mockStore } from '../../../../__mocks__/mockConfig';

import {
  verifyAuth
} from '../../../../actions/index.js';

import {
  VERIFY_AUTH_LOADING,
  VERIFY_AUTH_SUCCESS,
  VERIFY_AUTH_FAILURE
} from '../../../../constants';

describe('verifyAuth action creator', () => {
  test('dispatches a success action when dispatched with valid token', () => {
    const store = mockStore({ user: {} });
    const data = {
      user: {
        id: 2,
        username: 'ray',
        about: 'New to Postit',
        email: 'ray@example.com'
      }
    }

    // mocks the post request
    mock.onGet().replyOnce(200, {
      data
    });

    const expectedAction = {
      type: VERIFY_AUTH_SUCCESS,
      response: { data }
    }

    store.dispatch(verifyAuth('validtoken')).then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe('VERIFY_AUTH_LOADING');
        expect(actions[1].type).toBe('VERIFY_AUTH_SUCCESS');
        expect(actions[1].response.data).toEqual(expectedAction.response);
      });
  })

  test('dispatches a failure action when dispatched with invalid token', () => {
    const store = mockStore({ user: {} });
    const data = {
      error: 'Invalid authentication'
    }

    // mock the post request
    mock.onGet().replyOnce(400, data);

    const expectedAction = {
      type: VERIFY_AUTH_FAILURE,
      error: data.error
    };

    store.dispatch(verifyAuth('invalidtoken')).then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(VERIFY_AUTH_LOADING);
        expect(actions[1].type).toBe(VERIFY_AUTH_FAILURE);
      });
  })
});