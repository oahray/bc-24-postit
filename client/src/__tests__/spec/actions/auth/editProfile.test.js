import dotenv from 'dotenv';

import { mock, mockStore } from '../../../../__mocks__/mockConfig';

import {
  uploadImage,
  editProfile
} from '../../../../actions/index.js';

import {
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILURE
} from '../../../../constants';

dotenv.config();

describe('clearFormError function', () => {
  test('returns a promise object', () => {
    // mocks the post request
    mock.onPost().replyOnce(201, {
      data: {
        message: 'Group successfully updated'
      }
    });
    const upload = uploadImage({});
    expect(typeof upload).toBe('object');
    expect(typeof upload.then).toBe('function');
  });
});

describe('editProfile action creator', () => {
  test('dispatches a success action when dispatched with valid details', () => {
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
    mock.onPatch().replyOnce(201, {
      data: responseBody
    });

    const expectedAction = {
      type: EDIT_PROFILE_SUCCESS,
      response: { data: responseBody }
    };

    store.dispatch(editProfile('validtoken')).then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[1].type).toBe('EDIT_PROFILE_SUCCESS');
        expect(actions[1].response.data).toEqual(expectedAction.response);
      });
  });

  test('dispatches a failure action when dispatched with invalid details',
  () => {
    const store = mockStore({ user: {} });
    const responseBody = {
      error: 'Email is required'
    };

    // mock the post request
    mock.onPatch().replyOnce(400, responseBody);

    store.dispatch(editProfile('I like movies', null,
    'my image url', 'sometoken')).then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[1].type).toBe(EDIT_PROFILE_FAILURE);
      });
  });
});
