import { CREATE_GROUP_SUCCESS ,RESET_CREATE_GROUP_STATUS } from '../actions';

export default (state = null, action) => {
  switch (action.type) {
    case CREATE_GROUP_SUCCESS:
      return action.response.data.group
    case RESET_CREATE_GROUP_STATUS:
      return null
    default:
      return state
  }
}