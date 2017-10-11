import React from 'react';
import { shallow } from 'enzyme';

import { mockServer, mockStore } from '../../../__mocks__/mockConfig';
import ConnectedSideNav, { SideNav } from '../../../containers/SideNav';

let props;

const token = 'sudst56uawsytus754';
const currentUser = {
  id: 5,
  username: 'stranger',
  email: 'stranger@test.com',
  imageUrl: ''
};

const actionCreators = {
  logout: jest.fn(),
  getGroupList: jest.fn(),
  searchUsers: jest.fn(),
  history: {
    push: jest.fn()
  }
};

const logoutSpy = jest.spyOn(actionCreators, 'logout');
const getGroupListSpy = jest.spyOn(actionCreators, 'getGroupList');
const searchUsersSpy = jest.spyOn(actionCreators, 'searchUsers');
const historyPushSpy = jest.spyOn(actionCreators.history, 'push');

const setup = (user, isLoggedIn, inGroupPage) => {
  props = {
    user,
    isLoggedIn,
    token,
    groups: [{
      id: 5,
      name: 'my first group',
      description: '',
      type: 'public'
    },{
      id: 8,
      name: 'my secret group',
      description: 'Select eyes only',
      type: 'private'
    }],
    inGroupPage,
    selectedGroup: {
      id: 5,
      name: 'my first group',
      description: '',
      type: 'public'
    },
    history: actionCreators.history,
    // Action creators
    logout: actionCreators.logout,
    getGroupList: actionCreators.getGroupList,
    searchUsers: actionCreators.searchUsers
  };
  return shallow(<SideNav {...props} />);
}

describe('SideNav', () => {
  test('renders without crashing when user is not unauthenticated', () => {
    const wrapper = setup(currentUser,false, false);
    wrapper.find('.side-nav .my-list-item .docs-link').simulate('click');
  });

  test('renders without crashing when authenticated user has no profile image', () => {
    const wrapper = setup(currentUser, true, false);
    expect(wrapper.find('.side-nav .my-list-item a').length).toBeGreaterThan(0);

    mockServer.start();
    mockServer.emit('Added to group', ({ user: currentUser }));
    expect(getGroupListSpy).toBeCalled();

    mockServer.emit('Removed from group', ({ user: currentUser }))
    expect(getGroupListSpy).toBeCalled();

    mockServer.stop();
  });

  test('renders search bar when authenticated user has a profile image', () => {
    currentUser.imageUrl = '/images/no-pic.png';
    const wrapper = setup(currentUser, true, true);
    wrapper.find('.side-nav .log-out a').simulate('click');
    expect(logoutSpy).toBeCalled();
  });

  test('searchUsers method initiates search', () => {
    const wrapper = setup(currentUser, true, true);
    wrapper.instance().searchUsers('username', '/group/5/search');
    expect(searchUsersSpy).toBeCalled();
    expect(historyPushSpy).toBeCalled();
  });
});

describe('Connected SideNav', () => {
  test('renders without crashing', () => {
    const store = mockStore({
      user: {},
      token: '',
      isLoggedIn: true,
      groups: [],
      selectedGroup: {},
      inGroupPage: false
    });
    const wrapper = shallow(<ConnectedSideNav store={store} />);
    expect(wrapper.length).toBe(1);
  });
});
