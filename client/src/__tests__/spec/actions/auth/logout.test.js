import { logout } from '../../../../actions';
import { LOGOUT_USER } from '../../../../constants';

describe('logout action creator', () => {
  test('does not try to clear token from local storage when it is empty',
  () => {
    logout();
    expect(localStorage.removeItem).not.toHaveBeenCalledWith('x-auth');
  });

  test('clears token from local storage when it exists', () => {
    localStorage.__STORE__['x-auth'] = 'somestring';
    logout();

    expect(localStorage.removeItem).toHaveBeenLastCalledWith('x-auth');
  });

  test('returns an action with type LOGOUT_USER', () => {
    const expectedAction = {
      type: LOGOUT_USER
    };

    expect(logout()).toEqual(expectedAction);
  });
});
