import { CREATE_GROUP_SUCCESS,
  RESET_CREATE_GROUP_STATUS } from '../../../../constants';

import '../../../../reducers';

import createdGroup from '../../../../reducers/group/created';

describe('createdGroup reducer', () => {
  test('should handle different action types correctly', () => {
    const action = {
      response: {
        data: {
          group: {
            id: 5,
            name: '',
            description: '',
            type: ''
          }
        }
      }
    };

    const state = null;

    action.type = CREATE_GROUP_SUCCESS;
    expect(createdGroup(state, action)).toEqual(action.response.data.group);
    expect(createdGroup(undefined, action)).toEqual(action.response.data.group);

    action.type = RESET_CREATE_GROUP_STATUS;
    expect(createdGroup(state, action)).toBe(null);

    action.type = 'SOME_RANDOM_ACTION';
    expect(createdGroup(state, action)).toEqual(state);
  });
});