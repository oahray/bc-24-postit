import { VERIFY_AUTH_LOADING, VERIFY_AUTH_SUCCESS,
  VERIFY_AUTH_FAILURE, SIGNIN_SUCCESS, SIGNUP_SUCCESS,
  LOGOUT_USER } from '../../../actions';

export default (state = false, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return false;
    case SIGNUP_SUCCESS:
      return false;
    case VERIFY_AUTH_LOADING:
      return false;
    case VERIFY_AUTH_SUCCESS:
      return false;
    case VERIFY_AUTH_FAILURE:
      return true;
    case LOGOUT_USER:
      return true;
    default:
      return state;
  }
};
