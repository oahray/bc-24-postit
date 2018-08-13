import { mock, mockStore } from '../../../../__mocks__/mockConfig';

import {
  requestReset, clearResetRequestMessage, resetPassword
} from '../../../../actions';

import {
  REQUEST_RESET_SUCCESS,
  REQUEST_RESET_FAILURE,
  CLEAR_REQUEST_RESET_MESSAGE,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED
} from '../../../../constants';


describe('clearResetRequestMessage action creator', () => {
  test('dispatches an action with type CLEAR_REQUEST_RESET_MESSAGE',
  () => {
    const clearMessage = clearResetRequestMessage();
    const expectedAction = {
      type: CLEAR_REQUEST_RESET_MESSAGE
    };
    expect(clearMessage).toEqual(expectedAction);
  });
});

describe('requestReset action creator', () => {
  test('dispatches a success action when request to api is successful',
  () => {
    const store = mockStore({ user: {} });
    const responseBody = {
      message: 'An email with reset instructions has been sent'
    };

    // mocks the post request
    mock.onPost().replyOnce(200, {
      data: responseBody
    });

    const expectedAction = {
      type: REQUEST_RESET_SUCCESS,
      response: { data: responseBody }
    };

    store.dispatch(requestReset('validtoken')).then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[1].type).toBe('REQUEST_RESET_SUCCESS');
        expect(actions[1].response.data).toEqual(expectedAction.response);
      });
  });

  test('dispatches a failure action when request to api fails', () => {
    const store = mockStore({ user: {} });
    const responseBody = {
      error: 'Invalid authentication'
    };

    // mock the post request
    mock.onPost().replyOnce(400, responseBody);

    store.dispatch(requestReset('invalidtoken')).then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[1].type).toBe(REQUEST_RESET_FAILURE);
      });
  });
});

describe('resetPassword action creator', () => {
  test('dispatches a success action when request to api is successful', () => {
    const store = mockStore({ user: {} });
    const responseBody = {
      message: 'Password reset successful',
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

    const expectedAction = {
      type: RESET_PASSWORD_SUCCESS,
      response: { data: responseBody }
    };

    store.dispatch(resetPassword('validtoken')).then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe('RESET_PASSWORD_LOADING');
        expect(actions[1].type).toBe(RESET_PASSWORD_SUCCESS);
        expect(actions[1].response.data).toEqual(expectedAction.response);
      });
  });

  test('dispatches a success action when request to api fails', () => {
    const store = mockStore({ user: {} });
    const responseBody = {
      error: 'Invalid authentication'
    };

    // mock the post request
    mock.onPost().replyOnce(400, responseBody);

    store.dispatch(resetPassword('invalidtoken')).then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[1].type).toBe(RESET_PASSWORD_FAILED);
      });
  });
});
