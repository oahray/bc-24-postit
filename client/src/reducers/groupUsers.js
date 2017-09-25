import { GET_GROUP_USERS_SUCCESS, GET_GROUP_USERS_FAILURE,
  LOGOUT_USER } from '../actions';

export default (state = [], action) => {
  switch (action.type) {
    case GET_GROUP_USERS_SUCCESS:
      return action.response.data.users;
    case GET_GROUP_USERS_FAILURE:
      return [];
    case LOGOUT_USER:
      return [];
    default:
      return state;
  }
};
