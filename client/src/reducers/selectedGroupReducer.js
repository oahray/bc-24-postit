import { GET_GROUP_MESSAGES_LOADING, GET_GROUP_MESSAGES_SUCCESS, GET_GROUP_MESSAGES_FAILURE, LOGOUT_USER } from '../actions'

export default function(state = null, action) {
  switch (action.type) {
    case GET_GROUP_MESSAGES_SUCCESS:
      return action.response.data.group
    case GET_GROUP_MESSAGES_FAILURE:
      return null
    case LOGOUT_USER:
      return null
  }
  return state;
}

