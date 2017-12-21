import { mock, mockStore } from '../../../../__mocks__/mockConfig';
import {
  getGroupMessages
} from '../../../../actions';

import {
  GET_GROUP_MESSAGES_LOADING,
  GET_GROUP_MESSAGES_SUCCESS,
  GET_GROUP_MESSAGES_FAILURE
} from '../../../../constants';

describe('getGroupMessages action creator', () => {
  test('dispatches a signin success action when dispatched with valid details', () => {
    const store = mockStore({ user: {} });
    const groupId = 2;
    const responseBody = {
      group: {},
      messages: [{
        id: 2,
        content: 'heyyo mahn',
        sender: 'ray',
        priority: 'urgent'
      }]
    };

    // mocks the post request
    mock.onGet().replyOnce(200, {
      data: responseBody
    });

    store.dispatch(getGroupMessages(groupId, 'mypassword'))
    .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(GET_GROUP_MESSAGES_LOADING);
        expect(actions[1].type).toBe(GET_GROUP_MESSAGES_SUCCESS);
      });
  });

  test('dispatches a signin failure action when dispatched with invalid details',
  () => {
    const store = mockStore({ user: {} });
    const responseBody = {
      error: 'Specified group does not exist'
    };

    // mock the post request
    mock.onGet().replyOnce(400, responseBody);

    store.dispatch(getGroupMessages(undefined, 'testpassword'))
    .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(GET_GROUP_MESSAGES_LOADING);
        expect(actions[1].type).toBe(GET_GROUP_MESSAGES_FAILURE);
      });
  });
});
