import { VERIFY_AUTH_SUCCESS, VERIFY_AUTH_FAILURE, SIGNUP_SUCCESS,
  SIGNIN_SUCCESS, LOGOUT_USER, RESET_PASSWORD_SUCCESS } from '../../../actions';

export default (state = false, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return true;
    case SIGNUP_SUCCESS:
      return true;
    case VERIFY_AUTH_SUCCESS:
      return true;
    case VERIFY_AUTH_FAILURE:
      return false;
    case RESET_PASSWORD_SUCCESS:
      return true;
    case LOGOUT_USER:
      return false;
    default:
      return state;
  }
};
