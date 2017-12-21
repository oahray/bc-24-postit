import {
  GET_GROUP_MESSAGES_SUCCESS,
  GET_GROUP_MESSAGES_FAILURE,
  LOGOUT_USER,
  DELETE_GROUP_SUCCESS,
  EDIT_GROUP_INFO_SUCCESS,
  CREATE_GROUP_SUCCESS
} from '../../constants';

/**
   * @function messagesFailed
   * @description reducer that sets the redux state
   * with the selected group details
   * @param {null} state
   * @param {Object} action
   * @returns {Object} true/false depending on action type
   */
export default (state = null, action) => {
  switch (action.type) {
    case CREATE_GROUP_SUCCESS:
      return action.response.data.group;
    case GET_GROUP_MESSAGES_SUCCESS:
      return action.response.data.group;
    case GET_GROUP_MESSAGES_FAILURE:
      return null;
    case DELETE_GROUP_SUCCESS:
      return null;
    case EDIT_GROUP_INFO_SUCCESS:
      return action.response.data.group;
    case LOGOUT_USER:
      return null;
    default:
      return state;
  }
};
