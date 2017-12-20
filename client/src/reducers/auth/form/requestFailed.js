import { SIGNIN_LOADING, SIGNIN_SUCCESS,
  SIGNIN_FAILURE, SIGNUP_LOADING, SIGNUP_SUCCESS,
  SIGNUP_FAILURE } from '../../../actions';

  /**
   * @function requestFailed
   * @description reducer that sets redux state
   * with the status of failed signin/signup requests
   * @param {Boolean} state
   * @param {Object} action
   * @returns {Boolean} depending on action type
   */
export default (state = false, action) => {
  switch (action.type) {
    case SIGNIN_LOADING:
      return false;
    case SIGNIN_SUCCESS:
      return false;
    case SIGNIN_FAILURE:
      return true;
    case SIGNUP_LOADING:
      return false;
    case SIGNUP_SUCCESS:
      return false;
    case SIGNUP_FAILURE:
      return true;
    default:
      return state;
  }
};
