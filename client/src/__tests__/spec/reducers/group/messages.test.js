import {
  GET_GROUP_MESSAGES_SUCCESS,
  GET_GROUP_MESSAGES_FAILURE, LOGOUT_USER
} from '../../../../constants';
import groupList from '../../../../reducers/group/messages';

describe('groupList reducer', () => {
  const action = {
    response: {
      data: {
        messages: [
          {
            id: 15,
            content: 'hey all',
            priority: 'normal',
            sender: 'randomDude'
          },
          {
            id: 17,
            content: 'what\'s up mahn?',
            priority: 'normal',
            sender: 'someGuy'
          }
        ]
      }
    }
  };

  const state = [];

  test(`should return an array of groups
  for GET_GROUP_MESSAGES_SUCCESS action type`,
  () => {
    action.type = GET_GROUP_MESSAGES_SUCCESS;
    expect(groupList(state, action))
      .toEqual(action.response.data.messages);
    expect(groupList(undefined, action))
      .toEqual(action.response.data.messages);
  });

  test(`should return empty array for
  GET_GROUP_MESSAGES_FAILURE action type`,
  () => {
    action.type = GET_GROUP_MESSAGES_FAILURE;
    expect(groupList(state, action)).toEqual([]);
  });

  test('should return empty array for LOGOUT_USER action type',
  () => {
    action.type = LOGOUT_USER;
    expect(groupList(state, action)).toEqual([]);
  });

  test('should return current state for other action types',
  () => {
    action.type = 'SOME_RANDOM_ACTION';
    expect(groupList(state, action)).toEqual(state);
  });
});
