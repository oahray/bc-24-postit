import { IN_GROUP_TRUE, IN_GROUP_FALSE } from '../../../../constants';

import inGroupPage from '../../../../reducers/group/inGroupPage';

describe('inGroupPage reducer', () => {
  const action = {};
  const state = false;

  test('should return true for IN_GROUP_TRUE action type',
  () => {
    action.type = IN_GROUP_TRUE;
    expect(inGroupPage(state, action)).toBe(true);
    expect(inGroupPage(undefined, action)).toBe(true);
  });

  test('should return false for IN_GROUP_FALSE action type',
  () => {
    action.type = IN_GROUP_FALSE;
    expect(inGroupPage(state, action)).toBe(false);
  });

  test('should return current state for other action types',
  () => {
    action.type = 'SOME_RANDOM_ACTION';
    expect(inGroupPage(state, action)).toEqual(state);
  });
});
