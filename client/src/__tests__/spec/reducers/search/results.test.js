import { SEARCH_USERS_LOADING, SEARCH_USERS_SUCCESS,
  SEARCH_USERS_FAILURE } from '../../../../constants';

import searchResults from '../../../../reducers/search/results';

describe('searchResults', () => {
  test('should handle different action types correctly', () => {
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

    action.type = SEARCH_USERS_LOADING;
    expect(searchResults(undefined, action)).toEqual({});

    action.type = SEARCH_USERS_SUCCESS;
    expect(searchResults(state, action)).toEqual(action.response.data);

    action.type = SEARCH_USERS_FAILURE;
    expect(searchResults(undefined, action)).toEqual({});

    action.type = 'SOME_OTHER_ACTION';
    expect(searchResults(undefined, action)).toEqual(state);
  })
})