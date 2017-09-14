export const LOGOUT_USER = 'LOGOUT_USER';

export const logout = () => {
  // remove token from local storage
  if (window.localStorage.getItem('x-auth')) {
    window.localStorage.removeItem('x-auth');
  }
  // return an action for reducers to set auth state
  return {
    type: LOGOUT_USER
  };
};
