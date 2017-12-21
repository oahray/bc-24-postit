import {
  GET_GROUP_MESSAGES_SUCCESS,
  GET_GROUP_MESSAGES_FAILURE, LOGOUT_USER
} from '../../../../constants';
import groupList from '../../../../reducers/group/messages';

describe('groupList reducer', () => {
  test('should handle different action types correctly', () => {
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

    action.type = GET_GROUP_MESSAGES_SUCCESS;
    expect(groupList(state, action)).toEqual(action.response.data.messages);
    expect(groupList(undefined, action)).toEqual(action.response.data.messages);

    action.type = GET_GROUP_MESSAGES_FAILURE;
    expect(groupList(state, action)).toEqual([]);

    action.type = LOGOUT_USER;
    expect(groupList(state, action)).toEqual([]);

    action.type = 'SOME_RANDOM_ACTION';
    expect(groupList(state, action)).toEqual(state);
  });
});
