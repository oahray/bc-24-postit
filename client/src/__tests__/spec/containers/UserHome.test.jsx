import React from 'react';
import { shallow } from 'enzyme';

import { mockStore } from '../../../__mocks__/mockConfig';
import ConnectedHome, { UserHome } from '../../../containers/UserHome';

const token = 'jhdtsyjuykds675w';
const currentUser = {
  id: 5,
  username: 'stranger',
  email: 'stranger@test.com',
  imageUrl: ''
};

const groups = [{
  id: 5,
  name: 'my first group',
  description: '',
  type: 'public',
  createdBy: 'stranger'
}, {
  id: 8,
  name: 'my secret group',
  description: 'Select eyes only',
  type: 'private',
  createdBy: 'randomguy'
}];

const actionCreators = {
  getGroupList: jest.fn()
};

const setup = (user, groupList, groupListLoading = false) => {
  const props = {
    isLoggedIn: true,
    user,
    groupList,
    groupListLoading,
    token,
    // Action creators
    getGroupList: actionCreators.getGroupList
  };
  return shallow(<UserHome {...props} />);
};

describe('UserHome component', () => {
  test('renders without crashing when user has no groups', () => {
    const wrapper = setup(currentUser, [], false);
    expect(wrapper.length).toBe(1);
  });

  test('renders without crashing when user has no groups', () => {
    const wrapper = setup(currentUser, groups, false);
    expect(wrapper.length).toBe(1);
  });

  test('renders preloader while fetching groups', () => {
    const wrapper = setup(null, [], true);
    expect(wrapper.length).toBe(1);
  });
});

describe('Connected Home', () => {
  test('renders without crashing', () => {
    const store = mockStore({
      user: currentUser,
      token: '',
      isLoggedIn: true,
      groupList: [],
      groupListLoading: false
    });
    const wrapper = shallow(<ConnectedHome store={store} />);
    expect(wrapper.length).toBe(1);
  });
});
