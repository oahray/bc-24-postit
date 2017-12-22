import { CREATE_GROUP_SUCCESS,
  RESET_CREATE_GROUP_STATUS } from '../../../../constants';

import '../../../../reducers';

import createdGroup from '../../../../reducers/group/created';

describe('createdGroup reducer', () => {
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

  test('should return group object for CREATE_GROUP_SUCCESS action type',
  () => {
    action.type = CREATE_GROUP_SUCCESS;
    expect(createdGroup(state, action))
      .toEqual(action.response.data.group);
    expect(createdGroup(undefined, action))
      .toEqual(action.response.data.group);
  });

  test('should return null for RESET_CREATED_GROUP_STATUS action type',
  () => {
    action.type = RESET_CREATE_GROUP_STATUS;
    expect(createdGroup(state, action)).toBe(null);
  });

  test('should return current state for other action types',
  () => {
    action.type = 'SOME_RANDOM_ACTION';
    expect(createdGroup(state, action)).toEqual(state);
  });
});
