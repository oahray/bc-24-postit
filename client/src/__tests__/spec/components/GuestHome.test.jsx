import React from 'react';
import { shallow } from 'enzyme';

import GuestHome from '../../../components/GuestHome';

describe('Guest Home Component', () => {
  test('should mount correctly', () => {
    const wrapper = shallow(<GuestHome />);
    expect(wrapper.find('.guest-home').length).toBe(1);
    expect(wrapper.find('.guest-home-header').text()).toBe('Welcome to Postit!');
  });
});

