import { GET_GROUP_MESSAGES_LOADING, GET_GROUP_MESSAGES_SUCCESS, GET_GROUP_MESSAGES_FAILURE, LOGOUT_USER } from '../actions'

export default function(state = false, action) {
  switch (action.type) {
    case GET_GROUP_MESSAGES_LOADING:
      return true
    case GET_GROUP_MESSAGES_SUCCESS:
      return false
    case GET_GROUP_MESSAGES_FAILURE:
      return false
  }
  return state;
}