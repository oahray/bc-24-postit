import { IN_GROUP_TRUE, IN_GROUP_FALSE } from '../../../../constants';

import inGroupPage from '../../../../reducers/group/inGroupPage';

describe('inGroupPage reducer', () => {
  test('should handle different action types correctly', () => {
    const action = {};

    const state = false;

    action.type = IN_GROUP_TRUE;
    expect(inGroupPage(state, action)).toBe(true);
    expect(inGroupPage(undefined, action)).toBe(true);

    action.type = IN_GROUP_FALSE;
    expect(inGroupPage(state, action)).toBe(false);

    action.type = 'SOME_RANDOM_ACTION';
    expect(inGroupPage(state, action)).toEqual(state);
  });
});
