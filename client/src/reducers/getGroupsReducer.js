import { GROUPS_LIST_LOADING, GROUPS_LIST_SUCCESS, GROUPS_LIST_FAILURE, LOGOUT_USER } from '../actions'

export default function(state = [], action) {
  switch (action.type) {
    case GROUPS_LIST_SUCCESS:
      return action.response.data.userGroups
    case GROUPS_LIST_FAILURE:
      return []
    case LOGOUT_USER:
      return []
  }
  return state;
}