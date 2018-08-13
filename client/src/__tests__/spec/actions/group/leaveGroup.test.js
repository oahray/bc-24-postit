import { mock, mockStore } from '../../../../__mocks__/mockConfig';

import {
  leaveGroup
} from '../../../../actions';

import {
  LEAVE_GROUP_SUCCESS,
  LEAVE_GROUP_FAILURE
} from '../../../../constants';

describe('leaveGroup action creator', () => {
  test(`dispatches action with type "LEAVE_GROUP_SUCCESS"
  when api request is successful`, () => {
    const store = mockStore({ user: {} });
    const responseBody = {
      message: 'You have successfully left the group'
    };

    // mocks the post request
    mock.onPost().replyOnce(200, {
      data: responseBody
    });

    const expectedAction = {
      type: LEAVE_GROUP_SUCCESS,
      response: { data: responseBody }
    };

    store.dispatch(leaveGroup(3, 'validtoken'))
    .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[1].type).toBe(LEAVE_GROUP_SUCCESS);
        expect(actions[1].response.data)
          .toEqual(expectedAction.response);
      });
  });

  test(`dispatches action with type "LEAVE_GROUP_FAILURE"
  when api request fails`,
  () => {
    const store = mockStore({ user: {} });
    const responseBody = {
      error: 'Specified group does not exist'
    };

    // mock the post request
    mock.onPost().replyOnce(400, responseBody);

    store.dispatch(leaveGroup(99, 'validtoken'))
    .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[1].type).toBe(LEAVE_GROUP_FAILURE);
      });
  });
});
