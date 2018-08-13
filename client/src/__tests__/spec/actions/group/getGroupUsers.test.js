import { mock, mockStore } from '../../../../__mocks__/mockConfig';

import {
  getGroupUsers
} from '../../../../actions';

import {
  GET_GROUP_USERS_SUCCESS,
  GET_GROUP_USERS_FAILURE
} from '../../../../constants';

describe('getGroupUsers action creator', () => {
  test(`dispatches an action with type GET_GROUP_USERS_SUCCESS,
  when api request is successful`, () => {
    const store = mockStore({ user: {} });
    const responseBody = {
      users: [{
        id: 2,
        username: 'ray',
        about: 'New to Postit',
        email: 'ray@example.com'
      }]
    };

    // mocks the post request
    mock.onGet().replyOnce(200, {
      data: responseBody
    });

    const expectedAction = {
      type: GET_GROUP_USERS_SUCCESS,
      response: { data: responseBody }
    };

    store.dispatch(getGroupUsers(3, 'validtoken')).then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[1].type).toBe(GET_GROUP_USERS_SUCCESS);
        expect(actions[1].response.data).toEqual(expectedAction.response);
      });
  });

  test(`dispatches an action with type "GET_GROUP_USERS_FAILURE",
  when api request fails`, () => {
    const store = mockStore({ user: {} });
    const responseBody = {
      error: 'Specified group does not exist'
    };

    // mock the post request
    mock.onGet().replyOnce(400, responseBody);

    store.dispatch(getGroupUsers(99, 'invalidtoken'))
    .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[1].type).toBe(GET_GROUP_USERS_FAILURE);
      });
  });
});
