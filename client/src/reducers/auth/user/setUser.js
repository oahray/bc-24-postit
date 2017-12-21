import {
  VERIFY_AUTH_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNIN_SUCCESS,
  LOGOUT_USER,
  RESET_PASSWORD_SUCCESS,
  EDIT_PROFILE_SUCCESS
} from '../../../constants';

/**
   * @function setUser
   * @description reducer that sets the redux state
   * with the current user object
   * @param {Boolean} state
   * @param {Object} action
   * @returns {Boolean} true/false depending on action type
   */
export default (state = null, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return action.response.data.user;
    case SIGNUP_SUCCESS:
      return action.response.data.user;
    case VERIFY_AUTH_SUCCESS:
      return action.response.data.currentUser;
    case RESET_PASSWORD_SUCCESS:
      return action.response.data.user;
    case EDIT_PROFILE_SUCCESS:
      return action.response.data.profile;
    case LOGOUT_USER:
      return null;
    default:
      return state;
  }
};
