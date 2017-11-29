import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

import { mock, middlewares, mockStore } from '../../../../__mocks__/mockConfig';

import {
  editGroupInfo
} from '../../../../actions';

import {
  EDIT_GROUP_INFO_LOADING,
  EDIT_GROUP_INFO_SUCCESS,
  EDIT_GROUP_INFO_FAILURE
} from '../../../../constants';

describe('editGroupInfo action creator', () => {
  test('dispatches a success action when request is successful', () => {
    const store = mockStore({ user: {} });
    const data = {
      message: 'Group info successfully updated',
      group: {
        id: 2,
        name: 'Modified test group',
        description: 'Group for test purposes',
        type: 'private'
      }
    }

    // mocks the post request
    mock.onPatch().replyOnce(201, {
      data
    });

    mock.onGet().replyOnce(200, [
      data.group
    ]);

    const expectedAction = {
      type: EDIT_GROUP_INFO_SUCCESS,
      response: { data }
    }

    store.dispatch(editGroupInfo(data.group.name, data.group.description, data.group.type, 'validtoken')).then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(3);
        expect(actions[0].type).toBe('EDIT_GROUP_INFO_LOADING');
        expect(actions[1].type).toBe('EDIT_GROUP_INFO_SUCCESS');
        expect(actions[1].response.data).toEqual(expectedAction.response);
      });
  })

  test('dispatches a failure action when dispatched with invalid details', () => {
    const store = mockStore({ user: {} });
    const data = {
      error: 'Group name too long'
    }

    // mock the post request
    mock.onPatch().replyOnce(400, data);

    const expectedAction = {
      type: EDIT_GROUP_INFO_FAILURE,
      error: data.error
    };

    store.dispatch(editGroupInfo('The name of this group is just so long that it would raise an error', 'no description', 'public', 'sometoken')).then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(EDIT_GROUP_INFO_LOADING);
        expect(actions[1].type).toBe(EDIT_GROUP_INFO_FAILURE);
      });
  })
});