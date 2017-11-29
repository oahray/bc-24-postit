import axios from 'axios';

import {
  mock, middlewares, mockStore
} from '../../../../__mocks__/mockConfig';
import { clearFormError } from '../../../../actions';
import { CLEAR_FORM_ERROR } from '../../../../constants'

describe('clearFormError action creator', () => {
  test('dispatches an action', () => {
    const loadingUser = clearFormError();
    const expectedAction = {
      type: CLEAR_FORM_ERROR
    }
    expect(loadingUser).toEqual(expectedAction);
  });
});
