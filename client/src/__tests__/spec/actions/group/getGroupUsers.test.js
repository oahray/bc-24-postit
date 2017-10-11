import axios from 'axios';

import { mock, middlewares, mockStore } from '../../../../__mocks__/mockConfig';

import {
  getGroupUsers
} from '../../../../actions';

import {
  GET_GROUP_USERS_LOADING,
  GET_GROUP_USERS_SUCCESS,
  GET_GROUP_USERS_FAILURE
} from '../../../../constants';

describe('getGroupUsers action creator', () => {
  test('dispatches a success action when dispatched with valid token', () => {
    const store = mockStore({ user: {} });
    const data = {
      users: [{
        id: 2,
        username: 'ray',
        about: 'New to Postit',
        email: 'ray@example.com'
      }]
    };

    // mocks the post request
    mock.onGet().replyOnce(200, {
      data
    });

    const expectedAction = {
      type: GET_GROUP_USERS_SUCCESS,
      response: { data }
    }

    store.dispatch(getGroupUsers(3, 'validtoken')).then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe('GET_GROUP_USERS_LOADING');
        expect(actions[1].type).toBe('GET_GROUP_USERS_SUCCESS');
        expect(actions[1].response.data).toEqual(expectedAction.response);
      });
  })

  test('dispatches a failure action when dispatched with invalid token', () => {
    const store = mockStore({ user: {} });
    const data = {
      error: 'Specified group does not exist'
    }

    // mock the post request
    mock.onGet().replyOnce(400, data);

    const expectedAction = {
      type: GET_GROUP_USERS_FAILURE,
      error: data.error
    };

    store.dispatch(getGroupUsers(99, 'invalidtoken')).then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(GET_GROUP_USERS_LOADING);
        expect(actions[1].type).toBe(GET_GROUP_USERS_FAILURE);
      });
  })
});