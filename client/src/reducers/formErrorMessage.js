import { SIGNIN_SUCCESS, SIGNIN_FAILURE } from '../actions'

export default function(state = null, action) {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return action.data.user
    case SIGNIN_FAILURE:
      return null
    case LOGOUT_USER:
      return null
  }
  return state;
}