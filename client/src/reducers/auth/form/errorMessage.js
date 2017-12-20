import { SIGNIN_LOADING, SIGNIN_SUCCESS,
  SIGNIN_FAILURE, SIGNUP_LOADING, SIGNUP_SUCCESS,
  SIGNUP_FAILURE, CLEAR_FORM_ERROR } from '../../../actions';

  /**
   * @function errorMessage
   * @description reducer that sets the errorMessage
   * state in the redux store
   * @param {null} state
   * @param {Object} action
   * @returns {Object | null} depending on action type
   */
export default (state = null, action) => {
  switch (action.type) {
    case SIGNIN_LOADING:
      return null;
    case SIGNIN_SUCCESS:
      return null;
    case SIGNIN_FAILURE:
      return action.error;
    case SIGNUP_LOADING:
      return null;
    case SIGNUP_SUCCESS:
      return null;
    case SIGNUP_FAILURE:
      return action.error;
    case CLEAR_FORM_ERROR:
      return null;
    default:
      return state;
  }
};

