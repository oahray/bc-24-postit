import axios from 'axios';

import { mock, middlewares, mockStore } from '../../../../__mocks__/mockConfig';

import {
  leaveGroup
} from '../../../../actions';

import {
  LEAVE_GROUP_LOADING,
  LEAVE_GROUP_SUCCESS,
  LEAVE_GROUP_FAILURE
} from '../../../../constants';

describe('leaveGroup action creator', () => {
  test('dispatches a success action when dispatched with valid token', () => {
    const store = mockStore({ user: {} });
    const data = {
      message: 'You have successfully left the group'
    };

    // mocks the post request
    mock.onPost().replyOnce(200, {
      data
    });

    const expectedAction = {
      type: LEAVE_GROUP_SUCCESS,
      response: { data }
    }

    store.dispatch(leaveGroup(3, 'validtoken')).then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe('LEAVE_GROUP_LOADING');
        expect(actions[1].type).toBe('LEAVE_GROUP_SUCCESS');
        expect(actions[1].response.data).toEqual(expectedAction.response);
      });
  })

  test('should dispach a failure action when dispatched with invalid token', () => {
    const store = mockStore({ user: {} });
    const data = {
      error: 'Specified group does not exist'
    }

    // mock the post request
    mock.onPost().replyOnce(400, data);

    const expectedAction = {
      type: LEAVE_GROUP_FAILURE,
      error: data.error
    };

    store.dispatch(leaveGroup(99, 'validtoken')).then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(LEAVE_GROUP_LOADING);
        expect(actions[1].type).toBe(LEAVE_GROUP_FAILURE);
      });
  })
});