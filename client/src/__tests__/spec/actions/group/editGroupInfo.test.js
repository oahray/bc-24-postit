import dotenv from 'dotenv';

import { mock, mockStore } from '../../../../__mocks__/mockConfig';

import {
  editGroupInfo
} from '../../../../actions';

import {
  EDIT_GROUP_INFO_LOADING,
  EDIT_GROUP_INFO_SUCCESS,
  EDIT_GROUP_INFO_FAILURE
} from '../../../../constants';

dotenv.config();


describe('editGroupInfo action creator', () => {
  test('dispatches a success action when request is successful', () => {
    const store = mockStore({ user: {} });
    const responseBody = {
      message: 'Group info successfully updated',
      group: {
        id: 2,
        name: 'Modified test group',
        description: 'Group for test purposes',
        type: 'private'
      }
    };

    // mocks the post request
    mock.onPatch().replyOnce(201, {
      data: responseBody
    });

    mock.onGet().replyOnce(200, [
      responseBody.group
    ]);

    const expectedAction = {
      type: EDIT_GROUP_INFO_SUCCESS,
      response: { data: responseBody }
    };

    store.dispatch(editGroupInfo(responseBody.group.name, responseBody.group.description, responseBody.group.type, 'validtoken')).then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(3);
        expect(actions[0].type).toBe('EDIT_GROUP_INFO_LOADING');
        expect(actions[1].type).toBe('EDIT_GROUP_INFO_SUCCESS');
        expect(actions[1].response.data).toEqual(expectedAction.response);
      });
  });

  test('dispatches a failure action when dispatched with invalid details',
  () => {
    const store = mockStore({ user: {} });
    const responseBody = {
      error: 'Group name too long'
    };

    // mock the post request
    mock.onPatch().replyOnce(400, responseBody);

    store.dispatch(editGroupInfo('The name of this group is just so long that it would raise an error', 'no description', 'public', 'sometoken')).then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(EDIT_GROUP_INFO_LOADING);
        expect(actions[1].type).toBe(EDIT_GROUP_INFO_FAILURE);
      });
  });
});
