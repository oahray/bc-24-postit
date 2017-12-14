import { LOGOUT_USER } from '../../constants';

/**
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
