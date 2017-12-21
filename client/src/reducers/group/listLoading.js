import { GROUPS_LIST_LOADING, GROUPS_LIST_SUCCESS,
  GROUPS_LIST_FAILURE } from '../../constants';

  /**
   * @function listLoading
   * @description reducer that sets the redux state
   * with the loading status of the request
   * to fetch the list of groups the user belongs to
   * @param {Boolean} state
   * @param {Object} action
   * @returns {Boolean} true/false depending on action type
   */
export default (state = false, action) => {
  switch (action.type) {
    case GROUPS_LIST_LOADING:
      return true;
    case GROUPS_LIST_SUCCESS:
      return false;
    case GROUPS_LIST_FAILURE:
      return false;
    default:
      return state;
  }
};
