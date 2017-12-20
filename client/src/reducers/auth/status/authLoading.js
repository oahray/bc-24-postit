import { VERIFY_AUTH_LOADING, VERIFY_AUTH_SUCCESS,
  VERIFY_AUTH_FAILURE } from '../../../actions';

  /**
   * @function authLoading
   * @description reducer that sets the redux state
   * with the loading status of request to verify user
   * @param {Boolean} state
   * @param {Object} action
   * @returns {Boolean} true/false depending on action type
   */
export default (state = false, action) => {
  switch (action.type) {
    case VERIFY_AUTH_LOADING:
      return true;
    case VERIFY_AUTH_SUCCESS:
      return false;
    case VERIFY_AUTH_FAILURE:
      return false;
    default:
      return state;
  }
};
