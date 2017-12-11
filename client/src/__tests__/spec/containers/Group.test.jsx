import React from 'react';
import { shallow } from 'enzyme';

import { mockServer, mockStore } from '../../../__mocks__/mockConfig'
import ConnectedGroup, { Group } from '../../../containers/Group';
import Preloader from '../../../components/Preloader';
import { editGroupInfo, deleteGroup } from '../../../actions/index';

let props;
const currentUser = {
  id: 6,
  username: 'testuser',
  email: 'testuser@test.com',
  about: '',
  imageUrl: ''
};

const otherUser = {
  id: 12,
  username: 'otheruser',
  email: 'otheruser@test.com',
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

const otherGroup = {
  id: 5,
  name: 'New Test group',
  description: 'Group for tests',
  type: 'private',
  createdBy: 'testuser'
};

const groupList = [{
  id: 3,
  name: 'Test group',
  description: 'Group for test purposes',
  type: 'public',
  createdBy: 'testuser'
}, {
  id: 5,
  name: 'New Test group',
  description: 'Group for tests',
  type: 'private',
  createdBy: 'testuser'
}];

const match = {
  params: {
    groupid: group.id
  }
};

const message1 = {
  id: 16,
  content: 'Heyyo',
  priority: 'urgent',
  sender: currentUser.username
};

const message2 = {
  id: 17,
  content: 'Hey',
  priority: 'urgent',
  sender: otherUser.username
};

const groupMessages = [];

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
  sendMessage: jest.fn(),
  push: jest.fn()
}

const getMessagesSpy = jest.spyOn(actionCreators, 'getGroupMessages');
const pushSpy = jest.spyOn(actionCreators, 'push');
const sendMessageSpy = jest.spyOn(actionCreators, 'sendMessage');
const editSpy = jest.spyOn(actionCreators, 'editGroupInfo');
const removerUserSpy = jest.spyOn(actionCreators, 'removeUser');
const leaveGroupSpy = jest.spyOn(actionCreators, 'leaveGroup');
const deleteSpy = jest.spyOn(actionCreators, 'deleteGroup');

const setup = (user, selectedGroup, loading) => {
  props = {
    user,
    selectedGroup,
    groupMessages,
    groupList,
    groupMessagesLoading: loading,
    token,
    history: {
      push: actionCreators.push
    },
    match,
    // Action creators
    ...actionCreators
  };
  return shallow(<Group {...props} />);
}

describe('Group component', () => {
  test('should render without crashing', () => {
    const wrapper = setup(currentUser, group);
    expect(wrapper.length).toBe(1);
    mockServer.on('connection', (socket) => {
      socket.emit('Added to group', { group });
      socket.emit('Message posted', { message: message1, group});
      socket.emit('Removed from group', { user: currentUser, group });
      socket.emit('Left group', { user: currentUser, group });
    });
    wrapper.unmount();
  });

  test('rerenders when user navigates to new group', () => {
    const wrapper = setup(otherUser, group);
    expect(wrapper.length).toBe(1);
    mockServer.on('connection', (socket) => {
      socket.emit('Added to group', { group });
      socket.emit('Message posted', { message: message1, group});
      socket.emit('Removed from group', { user: currentUser, group });
      socket.emit('Left group', { user: currentUser, group });
    });
    match.params.groupid = 13;
    groupMessages.push(message1);
    wrapper.setProps({ match, groupMessages });
    expect(getMessagesSpy).toHaveBeenCalledTimes(3);
  });

  test('redirects when there is no selected group anymore', () => {
    const wrapper = setup(otherUser, group);
    expect(wrapper.length).toBe(1);
    groupMessages.push(message1, message2);
    wrapper.setProps({ match, groupMessages: [], selectedGroup: null, groupMessagesFailed: true });
    expect(pushSpy).toHaveBeenCalledWith('/');
  });

  test('allows user open and close messages', () => {
    const wrapper = setup(otherUser, group);
    expect(wrapper.length).toBe(1);
    match.params.groupid = group.id;

    wrapper.instance().openMessage(message1);
    expect(wrapper.instance().state.messageOpen).toBe(true);
    expect(wrapper.instance().state.selectedMessage).toEqual(message1);

    wrapper.instance().closeMessage();
    expect(wrapper.instance().state.messageOpen).toBe(false);
    expect(wrapper.instance().state.selectedMessage).toEqual({});
  });

  test('renders preloader while loading messages', () => {
    const wrapper = setup(otherUser, null, true);
    expect(wrapper.find(Preloader)).toHaveLength(1);
  });

  test('allows user type and send messages', () => {
    const wrapper = setup(otherUser, group);
    const event = { target : { value: 'Some message' }}
    wrapper.instance().onTypeText(event);
    expect(wrapper.instance().state.content).toBe('Some message');

    event.target.value = 'urgent';
    wrapper.instance().onSelectChange(event);
    expect(wrapper.instance().state.priority).toBe('urgent');

    wrapper.instance().sendMessage();
    expect(wrapper.instance().state.content).toBe('');
    expect(wrapper.instance().state.priority).toBe('normal');
    expect(sendMessageSpy).toHaveBeenCalledTimes(1);
    // Try to send message again, should not call spy again
    wrapper.instance().sendMessage();
    expect(sendMessageSpy).toHaveBeenCalledTimes(1);
  });

  test('can dispatch action to edit group', () => {
    const wrapper = setup(otherUser, group);
    wrapper.instance().editInfo();
    expect(editSpy).toHaveBeenCalledTimes(1);
  });

  test('can dispatch action to removeUser', () => {
    const wrapper = setup(otherUser, group);
    wrapper.instance().removeUser();
    expect(removerUserSpy).toHaveBeenCalledTimes(1);
  });

  test('can dispatch action to leave group', () => {
    const wrapper = setup(otherUser, group);
    wrapper.instance().leaveGroup();
    expect(leaveGroupSpy).toHaveBeenCalledTimes(1);
  });

  test('can dispatch action to delete group', () => {
    const wrapper = setup(otherUser, group);
    wrapper.instance().deleteGroup();
    expect(deleteSpy).toHaveBeenCalledTimes(1);
  });

  test('sets state when windows size changes below 600 and back', () => {
    const wrapper = setup(otherUser, group);
    expect(wrapper.instance().state.smallScreen).toBe(false);

    window.resizeTo(500);
    expect(wrapper.instance().state.smallScreen).toBe(true);

    window.resizeTo(900);
    expect(wrapper.instance().state.smallScreen).toBe(false);
  });

  test('can toggle between message and info view on small devices', () => {
    const wrapper = setup(otherUser, group);
    expect(wrapper.instance().state.showInfo).toBe(false);
    wrapper.instance().toggleInfo();
    expect(wrapper.instance().state.showInfo).toBe(true);
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