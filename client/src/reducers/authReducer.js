import { VERIFY_AUTH_SUCCESS, VERIFY_AUTH_FAILURE, SIGNUP_SUCCESS, SIGNIN_SUCCESS, SIGNIN_FAILURE, LOGOUT_USER } from '../actions'

export default function(state = false, action) {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return true
    case SIGNUP_SUCCESS:
      return true
    case VERIFY_AUTH_SUCCESS:
      return true
    case LOGOUT_USER:
      return false
    default:
      return state
  }
}