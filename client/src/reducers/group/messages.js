import { GET_GROUP_MESSAGES_SUCCESS,
  GET_GROUP_MESSAGES_FAILURE, LOGOUT_USER } from '../../constants';

  /**
   * @function messages
   * @description reducer that sets the redux state
   * with an array of messages in the selected group
   * @param {array} state
   * @param {Object} action
   * @returns {array} group messages
   */
export default (state = [], action) => {
  switch (action.type) {
    case GET_GROUP_MESSAGES_SUCCESS:
      return action.response.data.messages;
    case GET_GROUP_MESSAGES_FAILURE:
      return [];
    case LOGOUT_USER:
      return [];
    default:
      return state;
  }
};

