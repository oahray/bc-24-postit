import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

import { mock, middlewares, mockStore } from '../../../../__mocks__/mockConfig';

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

describe('resetCreateGroupStatus action creator', () => {
  test('dispatches an action', () => {
    // mocks the post request
    const resetStatus = resetCreateGroupStatus();
    expect(resetStatus.type).toBe(RESET_CREATE_GROUP_STATUS);
  });
});

describe('createNewGroup action creator', () => {
  test('dispatches a success action when dispatched with valid details', () => {
    const store = mockStore({ user: {} });
    const data = {
      message: 'Group successfully created',
      group: {
        id: 2,
        name: 'Test group',
        description: 'Group or test purposes',
        type: 'public'
      }
    }

    // mocks the post request
    mock.onPost().replyOnce(201, {
      data
    });

    // mock.onGet().replyOnce(200, {
    //   data
    // });

    const expectedAction = {
      type: CREATE_GROUP_SUCCESS,
      response: { data }
    }

    store.dispatch(createNewGroup(data.group.name, data.group.description, data.group.type, 'validtoken')).then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(3);
        expect(actions[0].type).toBe('CREATE_GROUP_LOADING');
        expect(actions[1].type).toBe('CREATE_GROUP_SUCCESS');
        expect(actions[1].response.data).toEqual(expectedAction.response);
      });
  })

  test('dispatches a failure action when dispatched with invalid details', () => {
    const store = mockStore({ user: {} });
    const data = {
      error: 'Group name too long'
    }

    // mock the post request
    mock.onPost().replyOnce(400, data);

    const expectedAction = {
      type: CREATE_GROUP_FAILURE,
      error: data.error
    };

    store.dispatch(createNewGroup('The name of this group is just so long that it would raise an error', 'no description', 'public', 'sometoken')).then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(CREATE_GROUP_LOADING);
        expect(actions[1].type).toBe(CREATE_GROUP_FAILURE);
      });
  })
});