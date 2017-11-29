import React from 'react';
import { shallow } from 'enzyme';

import { mockServer, mockStore } from '../../../__mocks__/mockConfig';
import ConnectedApp, { App } from '../../../containers/App';

let props;

const token = 'sudst56uawsytus754';
const currentUser = {
  id: 5,
  username: 'stranger',
  email: 'stranger@test.com',
  imageUrl: ''
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
}

describe('App', () => {
  test('renders without crashing', () => {
    const wrapper = setup(currentUser,false, true);
    expect(wrapper.length).toBe(1);
  });

  test('renders preloader when verifying user', () => {
    localStorage.__STORE__['x-auth'] = 'hdjhdidiydiuydi';
    const wrapper = setup(currentUser, true, false);
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
