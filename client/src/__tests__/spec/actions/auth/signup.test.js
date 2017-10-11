import axios from 'axios';

import { mock, middlewares, mockStore } from '../../../../__mocks__/mockConfig';
import {
  signupUser, signupLoading,
  SIGNUP_LOADING, SIGNUP_SUCCESS, SIGNUP_FAILURE
} from '../../../../actions/index.js';

describe('signupUser action creator', () => {
  test('dispatches a signup success action when dispatched with valid details', () => {
    const store = mockStore({ user: {} });
    const data = {
      message: 'Welcome ray',
      user: {
        id: 2,
        username: 'ray',
        about: 'New to Postit',
        email: 'ray@example.com'
      }
    }

    // mocks the post request
    mock.onPost().replyOnce(201, {
      data
    });

    const expectedAction = {
      type: SIGNUP_SUCCESS,
      response: { data }
    }

    store.dispatch(signupUser(data.user.username, 'mypassword', data.user.email)).then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(SIGNUP_LOADING);
        expect(actions[1].type).toBe(SIGNUP_SUCCESS);
      });
  })

  test('dispatches a signup failure action when dispatched with invalid details', () => {
    const store = mockStore({ user: {} });
    const data = {
      error: 'Username is required'
    }

    // mock the post request
    mock.onPost().replyOnce(400, {
      data
    });

    const expectedAction = {
      type: SIGNUP_FAILURE,
      response: { data }
    }

    store.dispatch(signupUser(undefined, 'testpassword', 'testemail@test.com')).then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(SIGNUP_LOADING);
        expect(actions[1].type).toBe(SIGNUP_FAILURE);
      });
  })
});
