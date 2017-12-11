import axios from 'axios';

import { mock, middlewares, mockStore } from '../../../../__mocks__/mockConfig';
import {
  signinUser, signinLoading,
  SIGNIN_LOADING, SIGNIN_SUCCESS, SIGNIN_FAILURE
} from '../../../../actions/index.js';

describe('signinUser action creator', () => {
  test('dispatches a signin success action when dispatched with valid details', () => {
    const store = mockStore({ user: {} });
    const data = {
      message: 'Welcome back ray',
      user: {
        id: 2,
        username: 'ray',
        about: 'New to Postit',
        email: 'ray@example.com'
      }
    }

    // mocks the post request
    mock.onPost().replyOnce(200, {
      data
    });

    const expectedAction = {
      type: SIGNIN_SUCCESS,
      response: { data }
    }

    store.dispatch(signinUser(data.user.username, 'mypassword')).then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe('SIGNIN_LOADING');
        expect(actions[1].type).toBe('SIGNIN_SUCCESS');
      });
  })

  test('dispatches a signin failure action when dispatched with invalid details', () => {
    const store = mockStore({ user: {} });
    const data = {
      error: 'Password is required'
    }

    // mock the post request
    mock.onPost().replyOnce(400, data);

    const expectedAction = {
      type: SIGNIN_FAILURE,
      error: data.error
    };

    store.dispatch(signinUser(undefined, 'testpassword')).then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(SIGNIN_LOADING);
        expect(actions[1].type).toBe(SIGNIN_FAILURE);
      });
  })
});
