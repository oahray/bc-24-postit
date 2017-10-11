import axios from 'axios';

import { mock, middlewares, mockStore } from '../../../../__mocks__/mockConfig';

import {
  markAsRead
} from '../../../../actions/index.js';

import {
  MARK_READ_FAILURE
} from '../../../../constants';

describe('markAsRead action creator', () => {
  test('dispatches a failure action when request failed', () => {
    const store = mockStore({ user: {} });
    const groupId = 3;
    const messageId = 13;
    const data = {
      error: 'Failed to mark as read'
    }

    // mock the post request
    mock.onPost().replyOnce(400, data);

    const expectedAction = {
      type: MARK_READ_FAILURE
    };

    store.dispatch(markAsRead(groupId, messageId, 'invalidtoken')).then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(MARK_READ_FAILURE);
      });
  })
});