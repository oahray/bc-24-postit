import { GET_GROUP_MESSAGES_SUCCESS,
  GET_GROUP_MESSAGES_FAILURE,
  LOGOUT_USER, DELETE_GROUP_SUCCESS,
  EDIT_GROUP_INFO_SUCCESS } from '../actions';

export default (state = null, action) => {
  switch (action.type) {
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
