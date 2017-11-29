import axios from 'axios';

import { mock, middlewares, mockStore } from '../../../../__mocks__/mockConfig';
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
    const data = {
      group: {},
      messages: [{
        id: 2,
        content: 'heyyo mahn',
        sender: 'ray',
        priority: 'urgent'
      }]
    }

    // mocks the post request
    mock.onGet().replyOnce(200, {
      data
    });

    const expectedAction = {
      type: GET_GROUP_MESSAGES_SUCCESS,
      response: { data }
    }

    store.dispatch(getGroupMessages(groupId, 'mypassword')).then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(GET_GROUP_MESSAGES_LOADING);
        expect(actions[1].type).toBe(GET_GROUP_MESSAGES_SUCCESS);
      });
  })

  test('dispatches a signin failure action when dispatched with invalid details', () => {
    const store = mockStore({ user: {} });
    const data = {
      error: 'Specified group does not exist'
    }

    // mock the post request
    mock.onGet().replyOnce(400, data);

    const expectedAction = {
      type: GET_GROUP_MESSAGES_FAILURE,
      error: data.error
    };

    store.dispatch(getGroupMessages(undefined, 'testpassword')).then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(GET_GROUP_MESSAGES_LOADING);
        expect(actions[1].type).toBe(GET_GROUP_MESSAGES_FAILURE);
      });
  })
});
