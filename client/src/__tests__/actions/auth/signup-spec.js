import axios from 'axios';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import MockAdapter from 'axios-mock-adapter';


// This sets the mock adapter on the default instance 
const mock = new MockAdapter(axios);

import { signupUser, signupLoading,
  SIGNUP_LOADING, SIGNUP_SUCCESS } from '../../../actions/index.js';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('signupUser action creator', () => {
  test('dispaches a signup loading action when dispatched', () => {
    const loadingUser = signupLoading();
    const expectedAction = {
      type: SIGNUP_LOADING
    }
    expect(loadingUser).toEqual(expectedAction);
  });

  test('dispaches a signup success action when dispatched with valid details', () => {
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
      response: {data}
    }

    store.dispatch(signupUser(data.user.username, 'mypassword', data.user.email)).then(() => store.getActions())
    .then((actions) => {
      expect(actions.length).toBe(2);
      expect(actions[0].type).toBe('SIGNUP_LOADING');
      expect(actions[1].type).toBe('SIGNUP_SUCCESS');
    });
  })

  test('dispaches a signup failure action when dispatched with invalid details', () => {
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
    mock.onPost().replyOnce(400, {
      error: 'Username is required'
    });

    // const expectedAction = {
    //   type: SIGNUP_SUCCESS,
    //   response: {data}
    // }

    store.dispatch(signupUser(data.user.username, 'testpassword', data.user.email)).then(() => store.getActions())
    .then((actions) => {
      expect(actions.length).toBe(2);
      expect(actions[0].type).toBe('SIGNUP_LOADING');
      expect(actions[1].type).toBe('SIGNUP_FAILURE');
    });
  })
});
