import { VERIFY_AUTH_SUCCESS, SIGNUP_SUCCESS, SIGNIN_SUCCESS, SIGNIN_FAILURE, LOGOUT_USER } from '../actions';

export default function(state = null, action) {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return action.response.headers['x-auth']
    case SIGNUP_SUCCESS:
      return action.response.headers['x-auth']
    case VERIFY_AUTH_SUCCESS:
      return action.response.headers['x-auth']
    case LOGOUT_USER:
      return null
    default:
      return state
  }
}