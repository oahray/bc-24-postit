import React from 'react';
import { shallow } from 'enzyme';

import Message from '../../../components/Message';

const message = {
  id: 2,
  content: 'Heyyo fam',
  priority: 'normal',
  sender: 'sammy',
  readBy: ''
};

const user = {
  id: 2,
  username: 'sammy',
  email: 'sammy@test.com',
  about: 'New to Postit',
  imageUrl: ''
};

const funcs = {
  closeMessage: jest.fn()
};

const closeMessageSpy = jest.spyOn(funcs, 'closeMessage');

describe('Message Component', () => {
  test('should mount correctly', () => {
    const wrapper = shallow(<Message user={user} message={message} />);
    expect(wrapper.find('.message-container').length).toBe(1);
    wrapper.unmount();
  });

  test('should call the close function when close icon is clicked', () => {
    message.readBy = 'user1,bran';
    const wrapper = shallow(<Message user={user} message={message} closeMessage={funcs.closeMessage} />);
    wrapper.find('.close-icon').simulate('click');
    expect(closeMessageSpy).toHaveBeenCalledTimes(1);
  });
});
