import { LOGOUT_USER } from '../../constants';

/**
 * @function logout
 * @description: action creator that dispatches
 * action with LOGUT_USER type
 * @returns {object} logout_user action
 */
export const logout = () => {
  // remove token from local storage
  if (localStorage.getItem('x-auth')) {
    localStorage.removeItem('x-auth');
  }
  // return an action for reducers to set auth state
  return {
    type: LOGOUT_USER
  };
};
