import axios from 'axios';

import { mock, middlewares, mockStore } from '../../../../__mocks__/mockConfig';

import {
  requestReset, clearResetRequestMessage, resetPassword
} from '../../../../actions';

import {
  REQUEST_RESET_LOADING,
  REQUEST_RESET_SUCCESS,
  REQUEST_RESET_FAILURE,
  CLEAR_REQUEST_RESET_MESSAGE,
  RESET_PASSWORD_LOADING,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED
} from '../../../../constants';


describe('clearResetRequestMessage action creator', () => {
  test('dispatches an action', () => {
    const clearMessage = clearResetRequestMessage();
    const expectedAction = {
      type: CLEAR_REQUEST_RESET_MESSAGE
    }
    expect(clearMessage).toEqual(expectedAction);
  });
});

describe('requestReset action creator', () => {
  test('dispatches a success action when dispatched with valid email', () => {
    const store = mockStore({ user: {} });
    const data = {
      message: "An email with reset instructions has been sent"
    }

    // mocks the post request
    mock.onPost().replyOnce(200, {
      data
    });

    const expectedAction = {
      type: REQUEST_RESET_SUCCESS,
      response: { data }
    }

    store.dispatch(requestReset('validtoken')).then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe('REQUEST_RESET_LOADING');
        expect(actions[1].type).toBe('REQUEST_RESET_SUCCESS');
        expect(actions[1].response.data).toEqual(expectedAction.response);
      });
  })

  test('dispatches a failure action when dispatched with invalid token', () => {
    const store = mockStore({ user: {} });
    const data = {
      error: 'Invalid authentication'
    }

    // mock the post request
    mock.onPost().replyOnce(400, data);

    const expectedAction = {
      type: REQUEST_RESET_FAILURE,
      error: data.error
    };

    store.dispatch(requestReset('invalidtoken')).then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(REQUEST_RESET_LOADING);
        expect(actions[1].type).toBe(REQUEST_RESET_FAILURE);
      });
  })
});

describe('resetPassword action creator', () => {
  test('dispatches a success action when dispatched with valid email', () => {
    const store = mockStore({ user: {} });
    const data = {
      message: 'Password reset successful',
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
      type: RESET_PASSWORD_SUCCESS,
      response: { data }
    }

    store.dispatch(resetPassword('validtoken')).then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe('RESET_PASSWORD_LOADING');
        expect(actions[1].type).toBe('RESET_PASSWORD_SUCCESS');
        expect(actions[1].response.data).toEqual(expectedAction.response);
      });
  })

  test('dispatches a failure action when dispatched with invalid token', () => {
    const store = mockStore({ user: {} });
    const data = {
      error: 'Invalid authentication'
    }

    // mock the post request
    mock.onPost().replyOnce(400, data);

    const expectedAction = {
      type: RESET_PASSWORD_FAILED,
      error: data.error
    };

    store.dispatch(resetPassword('invalidtoken')).then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(RESET_PASSWORD_LOADING);
        expect(actions[1].type).toBe(RESET_PASSWORD_FAILED);
      });
  })
});