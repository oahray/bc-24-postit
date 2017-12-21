import { SET_SEARCH_TERM, CLEAR_SEARCH_TERM } from '../../../../constants';

import searchTerm from '../../../../reducers/search/term';

describe('searchTerm reducer', () => {
  test('should handle different action types correctly', () => {
    const action = {
      searchTerm: 'us'
    };
    const state = '';

    action.type = SET_SEARCH_TERM;
    expect(searchTerm(state, action)).toBe(action.searchTerm);

    action.type = CLEAR_SEARCH_TERM;
    expect(searchTerm(state, action)).toEqual('');

    action.type = 'SOME_OTHER_ACTION';
    expect(searchTerm(undefined, action)).toEqual(state);
  });
});
