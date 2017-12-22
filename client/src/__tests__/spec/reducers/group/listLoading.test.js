import {
  GROUPS_LIST_LOADING, GROUPS_LIST_SUCCESS,
  GROUPS_LIST_FAILURE
} from '../../../../constants';

import listLoading from '../../../../reducers/group/listLoading';

describe('listLoading reducer', () => {
  const action = {};
  const state = false;

  test('should return true for GORUPS_LIST_LOADING action type',
  () => {
    action.type = GROUPS_LIST_LOADING;
    expect(listLoading(state, action)).toBe(true);
    expect(listLoading(undefined, action)).toBe(true);
  });

  test('should return false for GORUPS_LIST_SUCCESS action type',
  () => {
    action.type = GROUPS_LIST_SUCCESS;
    expect(listLoading(state, action)).toBe(false);
  });

  test('should return false for GROUPS_LIST_FAILURE action type',
  () => {
    action.type = GROUPS_LIST_FAILURE;
    expect(listLoading(state, action)).toBe(false);
  });

  test('should return current state for other action types',
  () => {
    action.type = 'SOME_RANDOM_ACTION';
    expect(listLoading(state, action)).toEqual(state);
  });
});
