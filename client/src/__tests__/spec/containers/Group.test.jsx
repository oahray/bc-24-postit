import React from 'react';
import { shallow } from 'enzyme';

import { mockServer, mockStore } from '../../../__mocks__/mockConfig'
import ConnectedGroup, { Group } from '../../../containers/Group';

let props;
const currentUser = {
  id: 6,
  username: 'testuser',
  email: 'testuser@test.com',
  about: '',
  imageUrl: ''
};

const group = {
  id: 3,
  name: 'Test group',
  description: 'Group for test purposes',
  type: 'public',
  createdBy: 'testuser'
};
const token = 'ds65e89ut976yyre';

const actionCreators = {
  getGroupMessages: jest.fn(),
  getGroupUsers: jest.fn(),
  getGroupList: jest.fn(),
  deleteGroup: jest.fn(),
  editGroupInfo: jest.fn(),
  removeUser: jest.fn(),
  leaveGroup: jest.fn(),
  inGroupPage: jest.fn(),
  sendMessage: jest.fn()
}

const getMessagesSpy = jest.spyOn(actionCreators, 'getGroupMessages');

const setup = (user, selectedGroup) => {
  props = {
    user,
    selectedGroup,
    token,
    match: {
      params: {
        groupid: group.id
      }
    },
    // Action creators
    getGroupMessages: actionCreators.getGroupMessages,
    getGroupUsers: actionCreators.getGroupUsers,
    getGroupList: actionCreators.getGroupList,
    deleteGroup: actionCreators.deleteGroup,
    editGroupInfo: actionCreators.editGroupInfo,
    removeUser: actionCreators.removeUser,
    leaveGroup: actionCreators.leaveGroup,
    inGroupPage: actionCreators.inGroupPage,
    sendMessage: actionCreators.sendMessage
  };
  return shallow(<Group {...props} />);
}

describe('Signin form', () => {
  test('should render without crashing', () => {
    const wrapper = setup(currentUser, group);
    expect(wrapper.length).toBe(1);
    mockServer.on('connection', (socket) => {
      socket.emit('Added to group', {group});
    });
  });
});

describe('Connected Group component', () => {
  test('renders without crashing', () => {
    const store = mockStore({
      user: currentUser,
      selectedGroup: group,
      token
    });
    const wrapper = shallow(<ConnectedGroup store={store} />);
    expect(wrapper.length).toBe(1);
  });
});