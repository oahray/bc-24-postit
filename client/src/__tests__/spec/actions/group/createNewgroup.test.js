import dotenv from 'dotenv';

import { mock, mockStore } from '../../../../__mocks__/mockConfig';

import {
  resetCreateGroupStatus,
  createNewGroup
} from '../../../../actions';

import {
  CREATE_GROUP_LOADING,
  CREATE_GROUP_SUCCESS,
  CREATE_GROUP_FAILURE,
  RESET_CREATE_GROUP_STATUS
} from '../../../../constants';

dotenv.config();

describe('resetCreateGroupStatus action creator', () => {
  test('dispatches an action with type "RESET_CREATE_GROUP_STATUS"', () => {
    // mocks the post request
    const resetStatus = resetCreateGroupStatus();
    expect(resetStatus.type).toBe(RESET_CREATE_GROUP_STATUS);
  });
});

describe('createNewGroup action creator', () => {
  test(`dispatches an action with type "CREATE_GROUP_SUCCESS",
  and the group details, when api request is successful`,
  () => {
    const store = mockStore({ user: {} });
    const responseBody = {
      message: 'Group successfully created',
      group: {
        id: 2,
        name: 'Test group',
        description: 'Group or test purposes',
        type: 'public'
      }
    };

    // mocks the post request
    mock.onPost().replyOnce(201, {
      data: responseBody
    });

    const expectedAction = {
      type: CREATE_GROUP_SUCCESS,
      response: { data: responseBody }
    };

    store.dispatch(createNewGroup(
      responseBody.group.name,
      responseBody.group.description,
      responseBody.group.type, 'validtoken'
    )).then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(3);
        expect(actions[0].type).toBe('CREATE_GROUP_LOADING');
        expect(actions[1].type).toBe('CREATE_GROUP_SUCCESS');
        expect(actions[1].response.data).toEqual(expectedAction.response);
      });
  });

  test(`dispatches an action with type "CREATE_GROUP_FAILURE",
  when api request fails`,
  () => {
    const store = mockStore({ user: {} });
    const responseBody = {
      error: 'Group name too long'
    };

    // mock the post request
    mock.onPost().replyOnce(400, responseBody);

    store.dispatch(createNewGroup(
      'The name of this group is just so long that it would raise an error',
      'no description', 'public', 'sometoken')).then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(CREATE_GROUP_LOADING);
        expect(actions[1].type).toBe(CREATE_GROUP_FAILURE);
      });
  });
});
