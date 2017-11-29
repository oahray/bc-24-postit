import { VERIFY_AUTH_SUCCESS, SIGNUP_SUCCESS,
  SIGNIN_SUCCESS, LOGOUT_USER, RESET_PASSWORD_SUCCESS } from '../actions';

export default (state = null, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return action.response.data.user;
    case SIGNUP_SUCCESS:
      return action.response.data.user;
    case VERIFY_AUTH_SUCCESS:
      return action.response.data.currentUser;
    case RESET_PASSWORD_SUCCESS:
      return action.response.data.user;
    case LOGOUT_USER:
      return null;
    default:
      return state;
  }
};
