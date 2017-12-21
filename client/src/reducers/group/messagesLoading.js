import { GET_GROUP_MESSAGES_LOADING,
  GET_GROUP_MESSAGES_SUCCESS,
  GET_GROUP_MESSAGES_FAILURE } from '../../constants';

  /**
   * @function messagesLoading
   * @description reducer that sets the redux state
   * with the loading status of request to get
   * group messages
   * @param {Boolean} state
   * @param {Object} action
   * @returns {Boolean} true/false depending on action type
   */
export default (state = false, action) => {
  switch (action.type) {
    case GET_GROUP_MESSAGES_LOADING:
      return true;
    case GET_GROUP_MESSAGES_SUCCESS:
      return false;
    case GET_GROUP_MESSAGES_FAILURE:
      return false;
    default:
      return state;
  }
};
