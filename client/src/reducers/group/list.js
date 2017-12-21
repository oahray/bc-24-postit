import { GROUPS_LIST_SUCCESS, GROUPS_LIST_FAILURE,
  LOGOUT_USER } from '../../constants';

/**
   * @function list
   * @description reducer that sets the redux state
   * with the list of groups the current user belongs to
   * @param {Boolean} state
   * @param {Object} action
   * @returns {Boolean} true/false depending on action type
   */
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
