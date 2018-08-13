import React from 'react';
import { shallow } from 'enzyme';
import jwt from 'jsonwebtoken';
import toastr from 'toastr';

import { mockServer, mockStore } from '../../../__mocks__/mockConfig';
import ConnectedApp, { App } from '../../../containers/App';

let props;

const token = jwt.sign({ id: 5, access: 'auth' },
  'somebuycjkcyutc', { expiresIn: 24 * 60 * 60 }).toString();

const currentUser = {
  id: 5,
  username: 'stranger',
  email: 'stranger@test.com',
  imageUrl: ''
};

const selectedGroup = {
  id: 7,
  name: 'my new group',
  description: '',
  type: 'public'
};

const actionCreators = {
  verifyAuth: jest.fn(),
};

const verifyAuthSpy = jest.spyOn(actionCreators, 'verifyAuth');

const setup = (user, authLoading, isLoggedIn) => {
  props = {
    user,
    verifyAuthLoading: authLoading,
    isLoggedIn,
    // Action creators
    verifyAuth: actionCreators.verifyAuth,
  };
  return shallow(<App {...props} />);
};

toastr.info = jest.fn();

describe('App', () => {
  localStorage.__STORE__['x-auth'] = token;
  test('renders without crashing', () => {
    const wrapper = setup(currentUser, false, true);
    expect(wrapper.length).toBe(1);
  });

  test('verifies token before component mounts', () => {
    setup(currentUser, false, true);
    expect(verifyAuthSpy).toHaveBeenCalledTimes(2);
  });

  test('shows toast when user is added to a group', () => {
    const wrapper = setup(currentUser, false, true);
    mockServer.on('connection', (socket) => {
      socket.emit('Added to group', ({
        user: currentUser,
        group: selectedGroup,
        addedBy: 'jim'
      }));
    });
    expect(wrapper.length).toBe(1);
  });

  test('shows toast when user is removed from a group', () => {
    const wrapper = setup(currentUser, false, true);
    mockServer.on('connection', (socket) => {
      socket.emit('Added to group', ({
        user: currentUser,
        group: selectedGroup,
        addedBy: 'jim'
      }));

      socket.emit('Removed from group', ({
        user: currentUser,
        group: selectedGroup,
        removedBy: 'jim'
      }));
    });
    expect(wrapper.length).toBe(1);
  });

  test('renders preloader when verifying user', () => {
    const wrapper = setup(currentUser, true, false);
    mockServer.on('connection', (socket) => {
      socket.emit('Added to group', ({ user: { id: 2 } }));

      socket.emit('Removed from group', ({ user: { id: 2 } }));
    });
    expect(wrapper.length).toBe(1);
  });
});

describe('Connected SigninForm', () => {
  test('renders without crashing', () => {
    const store = mockStore({
      user: currentUser,
      verifyAuthLoading: false,
      isLoggedIn: true
    });
    const wrapper = shallow(<ConnectedApp store={store} />);
    expect(wrapper.length).toBe(1);
  });
});
