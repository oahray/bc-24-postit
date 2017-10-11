import axios from 'axios';

import { mock, middlewares, mockStore } from '../../../../__mocks__/mockConfig';

import {
  searchUsers,
  addUserToGroup,
  removeUser,
  clearUserSearchTerm
} from '../../../../actions';

import {
  SET_SEARCH_TERM,
  CLEAR_SEARCH_TERM,
  SEARCH_USERS_LOADING,
  SEARCH_USERS_SUCCESS,
  SEARCH_USERS_FAILURE,
  ADD_USER_LOADING,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
  REMOVE_USER_LOADING,
  REMOVE_USER_SUCCESS,
  REMOVE_USER_FAILURE
} from '../../../../constants';

describe('clearUserSearchTerm action creator', () => {
  test('dispatches an action', () => {
    const clearTerm = clearUserSearchTerm();
    const expectedAction = {
      type: CLEAR_SEARCH_TERM
    }
    expect(clearTerm).toEqual(expectedAction);
  });
});

describe('searchUsers action creator', () => {
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

    mock.onGet().replyOnce(200, {
      data
    });

    const expectedAction = {
      type: SEARCH_USERS_SUCCESS,
      response: { data }
    }

    store.dispatch(searchUsers(3, 'somename', 0, 7, 'validtoken')).then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(3);
        expect(actions[0].type).toBe(SET_SEARCH_TERM);
        expect(actions[1].type).toBe(SEARCH_USERS_LOADING);
        expect(actions[2].type).toBe(SEARCH_USERS_SUCCESS);
        expect(actions[2].response.data).toEqual(expectedAction.response);
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
      type: SEARCH_USERS_FAILURE,
      error: data.error
    };

    store.dispatch(searchUsers(99, 'invalidtoken')).then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(3);
        expect(actions[0].type).toBe(SET_SEARCH_TERM);
        expect(actions[1].type).toBe(SEARCH_USERS_LOADING);
        expect(actions[2].type).toBe(SEARCH_USERS_FAILURE);
      });
  })
});

describe('addUserToGroup action creator', () => {
  test('dispatches a success action when dispatched with valid token', () => {
    const store = mockStore({ user: {} });
    const data = {
      messages: "somename has been added to the group"
    };

    const mockFn = {
      updateResults: jest.fn(() => ({}))
    };

    const spiedFn = jest.spyOn(mockFn, 'updateResults');

    // mocks the post request
    mock.onPost().replyOnce(201, {
      data
    });

    const expectedAction = {
      type: ADD_USER_SUCCESS,
      response: { data }
    }

    store.dispatch(addUserToGroup('somename', 3, mockFn.updateResults, 'validtoken')).then(() => store.getActions())
      .then((actions) => {
        expect(actions[0].type).toBe(ADD_USER_LOADING);
        expect(actions[1].type).toBe(ADD_USER_SUCCESS);
        expect(actions[1].response.data).toEqual(expectedAction.response);
        expect(spiedFn).toBeCalled();
      });
  })

  test('dispatches a failure action when dispatched with invalid token', () => {
    const store = mockStore({ user: {} });
    const data = {
      error: 'Specified group does not exist'
    }

    const mockFn = {
      updateResults: jest.fn(() => ({}))
    };

    const spiedFn = jest.spyOn(mockFn, 'updateResults');

    // mock the post request
    mock.onPost().replyOnce(400, data);

    const expectedAction = {
      type: SEARCH_USERS_FAILURE,
      error: data.error
    };

    store.dispatch(addUserToGroup('ausername', 99, mockFn.updateResults, 'invalidtoken')).then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(ADD_USER_LOADING);
        expect(actions[1].type).toBe(ADD_USER_FAILURE);
        expect(spiedFn).not.toBeCalled();
      });
  })
});

describe('removeUser action creator', () => {
  test('dispatches a success action when dispatched with valid token', () => {
    const store = mockStore({ user: {} });
    const data = {
      messages: "Ray has been removed from the group"
    };

    const mockFn = {
      updateResults: jest.fn(() => ({}))
    };

    const spiedFn = jest.spyOn(mockFn, 'updateResults');

    // mocks the post request
    mock.onDelete().replyOnce(201, {
      data
    });

    const expectedAction = {
      type: SEARCH_USERS_SUCCESS,
      response: { data }
    }

    store.dispatch(removeUser('somename', 3, mockFn.updateResults, 'validtoken')).then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(REMOVE_USER_LOADING);
        expect(actions[1].type).toBe(REMOVE_USER_SUCCESS);
        expect(actions[1].response.data).toEqual(expectedAction.response);
        expect(spiedFn).toBeCalled();
      });
  })

  test('dispatches a failure action when dispatched with invalid token', () => {
    const store = mockStore({ user: {} });
    const data = {
      error: 'Specified group does not exist'
    }

    const mockFn = {
      updateResults: jest.fn(() => ({}))
    };

    const spiedFn = jest.spyOn(mockFn, 'updateResults');

    // mock the post request
    mock.onDelete().replyOnce(400, data);

    const expectedAction = {
      type: SEARCH_USERS_FAILURE,
      error: data.error
    };

    store.dispatch(removeUser('ausername', 99, mockFn.updateResults, 'invalidtoken')).then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(REMOVE_USER_LOADING);
        expect(actions[1].type).toBe(REMOVE_USER_FAILURE);
        expect(spiedFn).not.toBeCalled();
      });
  })
});