import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

import { mock, middlewares, mockStore } from'../../../../__mocks__/mockConfig';

import {
  inGroupPage
} from '../../../../actions';

import {
  IN_GROUP_TRUE,
  IN_GROUP_FALSE
} from '../../../../constants';

describe('inGroupPage action creator', () => {
  test('returns an action with type IN_GROUP_FALSE when inPage param is not true', () => {
    // mocks the post request
    const resetStatus = inGroupPage();
    expect(resetStatus.type).toBe(IN_GROUP_FALSE);
  });

  test('returns an action with type IN_GROUP_FALSE when inPage param is not true', () => {
    // mocks the post request
    const resetStatus = inGroupPage(true);
    expect(resetStatus.type).toBe(IN_GROUP_TRUE);
  });
});