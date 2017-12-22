import { mock, mockStore } from '../../../../__mocks__/mockConfig';

import {
  sendMessage
} from '../../../../actions/index.js';

import {
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILURE
} from '../../../../constants';

describe('sendMessage action creator', () => {
  test(`dispatches action with type "SEND_MESSAGE_SUCCESS"
  when api request is successful`, () => {
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
    mock.onPost().replyOnce(201, {
      data: responseBody
    });
    mock.onGet().reply(200, {
      data: responseBody
    });

    const expectedAction = {
      type: SEND_MESSAGE_SUCCESS,
      response: { data: responseBody }
    };

    store.dispatch(sendMessage('validtoken'))
    .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(3);
        expect(actions[1].type).toBe(SEND_MESSAGE_SUCCESS);
        expect(actions[1].response.data)
          .toEqual(expectedAction.response);
      });
  });

  test(`dispatches action with type "SEND_MESSAGE_FAILURE"
  when api request fails`, () => {
    const store = mockStore({ user: {} });
    const responseBody = {
      error: 'Invalid authentication'
    };

    // mock the post request
    mock.onPost().replyOnce(400, responseBody);

    store.dispatch(sendMessage('invalidtoken'))
    .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[1].type).toBe(SEND_MESSAGE_FAILURE);
      });
  });
});
