import { GET_GROUP_MESSAGES_LOADING,
  GET_GROUP_MESSAGES_SUCCESS, GET_GROUP_MESSAGES_FAILURE,
  LOGOUT_USER } from '../../constants';

/**
   * @function messagesFailed
   * @description reducer that sets the redux state
   * with the failure status of request to get
   * group messages
   * @param {Boolean} state
   * @param {Object} action
   * @returns {Boolean} true/false depending on action type
   */
export default (state = false, action) => {
  switch (action.type) {
    case GET_GROUP_MESSAGES_LOADING:
      return false;
    case GET_GROUP_MESSAGES_SUCCESS:
      return false;
    case GET_GROUP_MESSAGES_FAILURE:
      return true;
    case LOGOUT_USER:
      return false;
    default:
      return state;
  }
};
