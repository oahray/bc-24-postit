import { VERIFY_AUTH_SUCCESS, SIGNUP_SUCCESS, SIGNIN_SUCCESS,
  LOGOUT_USER, RESET_PASSWORD_SUCCESS } from '../../../constants';

export default (state = null, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return action.response.headers['x-auth'];
    case SIGNUP_SUCCESS:
      return action.response.headers['x-auth'];
    case VERIFY_AUTH_SUCCESS:
      return window.localStorage.getItem('x-auth');
    case RESET_PASSWORD_SUCCESS:
      return action.response.headers['x-auth'];
    case LOGOUT_USER:
      return null;
    default:
      return state;
  }
};
