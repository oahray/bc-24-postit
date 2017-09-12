import { REQUEST_RESET_LOADING, REQUEST_RESET_SUCCESS, REQUEST_RESET_FAILURE,
  CLEAR_REQUEST_RESET_MESSAGE, RESET_PASSWORD_LOADING, RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED } from '../actions';

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

export const resetPasswordError = (state = null, action) => {
  switch (action.type) {
    case RESET_PASSWORD_LOADING:
      return null;
    case RESET_PASSWORD_FAILED:
      return action.error;
    // case CLEAR_RESET_PASSWORD_ERROR:
    //   return null;
    default:
      return state;
  }
};
