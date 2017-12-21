import { mock, mockStore } from '../../../../__mocks__/mockConfig';

import {
  deleteGroup
} from '../../../../actions/index.js';

import {
  DELETE_GROUP_LOADING,
  DELETE_GROUP_SUCCESS,
  DELETE_GROUP_FAILURE
} from '../../../../constants';

describe('deleteGroup action creator', () => {
  test('dispatches a success action when dispatched with valid group id and token', () => {
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
    mock.onGet().replyOnce(500);

    const expectedAction = {
      type: DELETE_GROUP_SUCCESS,
      response: { data: responseBody }
    };

    store.dispatch(deleteGroup('validtoken')).then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(3);
        expect(actions[0].type).toBe('DELETE_GROUP_LOADING');
        expect(actions[1].type).toBe('DELETE_GROUP_SUCCESS');
        expect(actions[1].response.data).toEqual(expectedAction.response);
      });
  });

  test('dispatches a failure action when request fails', () => {
    const store = mockStore({ user: {} });
    const responseBody = {
      error: 'Invalid authentication'
    };

    // mock the post request
    mock.onPost().replyOnce(400, responseBody);

    store.dispatch(deleteGroup('invalidtoken')).then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(DELETE_GROUP_LOADING);
        expect(actions[1].type).toBe(DELETE_GROUP_FAILURE);
      });
  });
});
