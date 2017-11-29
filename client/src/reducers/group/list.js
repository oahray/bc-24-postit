import { GROUPS_LIST_SUCCESS, GROUPS_LIST_FAILURE,
  LOGOUT_USER } from '../../constants';

export default (state = [], action) => {
  switch (action.type) {
    case GROUPS_LIST_SUCCESS:
      return action.response.data.userGroups;
    case GROUPS_LIST_FAILURE:
      return [];
    case LOGOUT_USER:
      return [];
    default:
      return state;
  }
};
