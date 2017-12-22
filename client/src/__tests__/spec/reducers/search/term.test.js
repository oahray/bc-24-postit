import { SET_SEARCH_TERM, CLEAR_SEARCH_TERM } from '../../../../constants';

import searchTerm from '../../../../reducers/search/term';

describe('searchTerm reducer', () => {
  const action = {
    searchTerm: 'us'
  };
  const state = '';

  test('should return searchTerm string for SET_SEARCH_TERM action type',
  () => {
    action.type = SET_SEARCH_TERM;
    expect(searchTerm(state, action)).toBe(action.searchTerm);
  });

  test('should return empty string for CLEAR_SEARCH_TERM action type',
  () => {
    action.type = CLEAR_SEARCH_TERM;
    expect(searchTerm(state, action)).toEqual('');
  });

  test('should return current state for other action types',
  () => {
    action.type = 'SOME_OTHER_ACTION';
    expect(searchTerm(undefined, action)).toEqual(state);
  });
});
