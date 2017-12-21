import { REQUEST_RESET_LOADING, REQUEST_RESET_SUCCESS, REQUEST_RESET_FAILURE,
  CLEAR_REQUEST_RESET_MESSAGE, RESET_PASSWORD_LOADING, RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED } from '../../../constants';

/**
   * @function resetPasswordLoading
   * @description reducer that sets the redux state
   * with the loading status of request to resetPassword
   * @param {Boolean} state
   * @param {Object} action
   * @returns {Boolean} true/false depending on action type
   */
export const requestResetLoading = (state = false, action) => {
  switch (action.type) {
    case REQUEST_RESET_LOADING:
      return true;
    case REQUEST_RESET_SUCCESS:
      return false;
    case REQUEST_RESET_FAILURE:
      return false;
    default:
      return state;
  }
};

/**
   * @function requestResetMessage
   * @description reducer that sets the redux state
   * with the success or error message from
   * request to reset password
   * @param {Object} state
   * @param {Object} action
   * @returns {Object} api response
   */
export const requestResetMessage = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_RESET_LOADING:
      return {};
    case REQUEST_RESET_SUCCESS:
      return {
        requestResetSuccess: true,
        requestResetMessage: action.response.data.message
      };
    case REQUEST_RESET_FAILURE:
      return {
        requestResetSuccess: false,
        requestResetMessage: action.error
      };
    case CLEAR_REQUEST_RESET_MESSAGE:
      return {};
    default:
      return state;
  }
};

/**
   * @function resetPasswordLoading
   * @description reducer that sets the redux state
   * with the loading status of request to verify user
   * @param {Boolean} state
   * @param {Object} action
   * @returns {Boolean} true/false depending on action type
   */
export const resetPasswordLoading = (state = false, action) => {
  switch (action.type) {
    case RESET_PASSWORD_LOADING:
      return true;
    case RESET_PASSWORD_SUCCESS:
      return false;
    case RESET_PASSWORD_FAILED:
      return false;
    default:
      return state;
  }
};

/**
   * @function resetPasswordError
   * @description reducer that sets the redux state
   * with the loading status of request to verify user
   * @param {false} state
   * @param {Object} action
   * @returns {Boolean | null} true/false or null
   * depending on action type
   */
export const resetPasswordError = (state = null, action) => {
  switch (action.type) {
    case RESET_PASSWORD_LOADING:
      return null;
    case RESET_PASSWORD_FAILED:
      return action.error;
    default:
      return state;
  }
};
