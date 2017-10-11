import { GET_GROUP_MESSAGES_LOADING,
  GET_GROUP_MESSAGES_SUCCESS, GET_GROUP_MESSAGES_FAILURE,
  LOGOUT_USER } from '../../constants';

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
