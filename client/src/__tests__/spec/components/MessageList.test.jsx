import React from 'react';
import { shallow } from 'enzyme';

import MessageList from '../../../components/MessageList';

const mockFn = {
  leave: jest.fn(),
  remove: jest.fn(),
  open: jest.fn()
};

let groupMessages = [{
  id: 2,
  content: 'hello',
  priority: 'normal',
  sender: 'sammy',
  groupid: 3
}, {
  id: 5,
  content: 'hey',
  priority: 'urgent',
  sender: 'ray',
  groupid: 3
}];

const selectedGroup = {
  id: 3,
  name: 'Test group',
  description: 'Group for test purposes',
  type: 'public',
  createdBy: 'ray'
};
const openSpy = jest.spyOn(mockFn, 'open');

describe('MessageList component', () => {
  const wrapper = () => shallow(<MessageList
    groupMessages={groupMessages}
    selectedGroup={selectedGroup}
    leaveGroup={mockFn.leave}
    removeUser={mockFn.remove}
    openMessage={mockFn.open}/>);

  test('should mount without crashing', () => {
    wrapper().find(`#message-${groupMessages[0]
      .groupid}${groupMessages[0].id}`).simulate('click');
    expect(openSpy).toHaveBeenCalledTimes(1);
  });

  test('should render alternate message when there are no messages', () => {
    groupMessages = [];
    expect(wrapper().find('#message-list h6').text())
    .toBe('This group does not contain any messages');
  });
});
