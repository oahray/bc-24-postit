import axios from 'axios';

import { mock, middlewares, mockStore } from '../../../../__mocks__/mockConfig';

import {
  sendMessage
} from '../../../../actions/index.js';

import {
  SEND_MESSAGE_LOADING,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILURE
} from '../../../../constants';

describe('sendMessage action creator', () => {
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
    mock.onPost().replyOnce(201, {
      data
    });
    mock.onGet().reply(200, {
      data
    });

    const expectedAction = {
      type: SEND_MESSAGE_SUCCESS,
      response: { data }
    }

    store.dispatch(sendMessage('validtoken')).then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(3);
        expect(actions[0].type).toBe('SEND_MESSAGE_LOADING');
        expect(actions[1].type).toBe('SEND_MESSAGE_SUCCESS');
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
      type: SEND_MESSAGE_FAILURE,
      error: data.error
    };

    store.dispatch(sendMessage('invalidtoken')).then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(SEND_MESSAGE_LOADING);
        expect(actions[1].type).toBe(SEND_MESSAGE_FAILURE);
      });
  })
});