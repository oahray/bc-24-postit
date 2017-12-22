import { SEARCH_USERS_LOADING, SEARCH_USERS_SUCCESS,
  SEARCH_USERS_FAILURE } from '../../../../constants';

import searchResults from '../../../../reducers/search/results';

describe('searchResults', () => {
  const action = {
    response: {
      data: {
        totalCount: 1,
        page: 1,
        users: [
          {
            id: '15',
            username: 'stranger',
            about: 'New to Postit',
            email: 'stranger@example.com',
            imageUrl: ''
          }
        ]
      }
    }
  };
  const state = {};

  test('should return empty object for SEARCH_USERS_LOADING action type',
  () => {
    action.type = SEARCH_USERS_LOADING;
    expect(searchResults(undefined, action)).toEqual({});
  });

  test(`should return search result object
  for SEARCH_USERS_SUCCESS action type`,
  () => {
    action.type = SEARCH_USERS_SUCCESS;
    expect(searchResults(state, action)).toEqual(action.response.data);
  });

  test('should return empty object for SEARCH_USERS_FAILURE action type',
  () => {
    action.type = SEARCH_USERS_FAILURE;
    expect(searchResults(undefined, action)).toEqual({});
  });

  test('should return current state for other action types',
  () => {
    action.type = 'SOME_OTHER_ACTION';
    expect(searchResults(undefined, action)).toEqual(state);
  });
});
