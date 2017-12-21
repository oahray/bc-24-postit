import { SIGNUP_LOADING, SIGNUP_SUCCESS,
  SIGNUP_FAILURE, SIGNIN_LOADING, SIGNIN_SUCCESS,
  SIGNIN_FAILURE } from '../../../actions';

/**
   * @function loadingUser
   * @description reducer that sets the redux state
   * with the loading status of request to authenticate
   * @param {Boolean} state
   * @param {Object} action
   * @returns {Boolean} true/false depending on action type
   */
export default (state = false, action) => {
  switch (action.type) {
    case SIGNIN_LOADING:
      return true;
    case SIGNIN_SUCCESS:
      return false;
    case SIGNIN_FAILURE:
      return false;
    case SIGNUP_LOADING:
      return true;
    case SIGNUP_SUCCESS:
      return false;
    case SIGNUP_FAILURE:
      return false;
    default:
      return state;
  }
};

