import React from 'react';
import { shallow, mount } from 'enzyme';
import { mock, mockStore } from '../../../__mocks__/mockConfig';
import UserInfoModal from '../../../components/UserInfoModal';

const user = {
  id: 2,
  username: 'ray',
  imageUrl: ''
};

describe('UserInfoModal component', () => {
  test('should mount without crashing', () => {
    user.imageUrl = 1;
    const wrapper = () => shallow(<UserInfoModal
      user={user} />);
    expect(wrapper().find('#user2-modal').length).toBe(1);
    expect(wrapper().find('h3').text()).toBe(' ray');
  });
});

