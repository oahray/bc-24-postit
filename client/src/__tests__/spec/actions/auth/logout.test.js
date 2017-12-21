import { logout } from '../../../../actions';
import { LOGOUT_USER } from '../../../../constants';

describe('logout action creator', () => {
  test('dispatches an action', () => {
    const expectedAction = {
      type: LOGOUT_USER
    };
    expect(localStorage.getItem).not.toHaveBeenLastCalledWith('x-auth');
    expect(logout()).toEqual(expectedAction);

    localStorage.__STORE__['x-auth'] = 'somestring';
    const loadingUser = logout();

    expect(localStorage.getItem).toHaveBeenLastCalledWith('x-auth');
    expect(loadingUser).toEqual(expectedAction);
  });
});
