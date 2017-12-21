import {
  GROUPS_LIST_LOADING, GROUPS_LIST_SUCCESS,
  GROUPS_LIST_FAILURE
} from '../../../../constants';

import listLoading from '../../../../reducers/group/listLoading';

describe('listLoading reducer', () => {
  test('should handle different action types correctly', () => {
    const action = {};

    const state = false;

    action.type = GROUPS_LIST_LOADING;
    expect(listLoading(state, action)).toBe(true);
    expect(listLoading(undefined, action)).toBe(true);

    action.type = GROUPS_LIST_SUCCESS;
    expect(listLoading(state, action)).toBe(false);

    action.type = GROUPS_LIST_FAILURE;
    expect(listLoading(state, action)).toBe(false);

    action.type = 'SOME_RANDOM_ACTION';
    expect(listLoading(state, action)).toEqual(state);
  });
});
