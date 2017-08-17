import { SIGNUP_FAILURE, SIGNIN_FAILURE } from '../actions'

export default function(state = null, action) {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return action.data.error
    case SIGUP_FAILURE:
      return action.data.error
  }
  return state;
}