import {
  GET_GROUP_MESSAGES_SUCCESS,
  GET_GROUP_MESSAGES_FAILURE,
  LOGOUT_USER,
  DELETE_GROUP_SUCCESS,
  EDIT_GROUP_INFO_SUCCESS,
  CREATE_GROUP_SUCCESS
} from '../../../../constants';
import selectedGroup from '../../../../reducers/group/selected';

describe('selectedGroup reducer', () => {
  test('should handle different action types correctly', () => {
    const action = {
      response: {
        data: {
          group: {
            id: 5,
            name: 'my first group',
            description: '',
            type: 'public'
          }
        }
      }
    };

    const state = null;

    action.type = CREATE_GROUP_SUCCESS;
    expect(selectedGroup(state, action)).toEqual(action.response.data.group);
    expect(selectedGroup(undefined, action)).toEqual(action.response.data.group);

    action.type = GET_GROUP_MESSAGES_SUCCESS;
    expect(selectedGroup(state, action)).toEqual(action.response.data.group);

    action.type = GET_GROUP_MESSAGES_FAILURE;
    expect(selectedGroup(state, action)).toEqual(null);

    action.type =DELETE_GROUP_SUCCESS;
    expect(selectedGroup(state, action)).toEqual(null);

    action.type = EDIT_GROUP_INFO_SUCCESS;
    expect(selectedGroup(state, action)).toEqual(action.response.data.group);

    action.type = LOGOUT_USER;
    expect(selectedGroup(state, action)).toEqual(null);

    action.type = 'SOME_RANDOM_ACTION';
    expect(selectedGroup(state, action)).toEqual(state);
  });
});