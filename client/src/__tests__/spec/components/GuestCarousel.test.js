import React from 'react';
import { shallow } from 'enzyme';

import GuestCarousel from '../../../components/GuestCarousel';

describe('Guest Carousel Component', () => {
  test('should mount correctly', () => {
    const wrapper = shallow(<GuestCarousel />);
    expect(wrapper.find('#guest-carousel').length).toBe(1);
    expect(wrapper.find('.carousel-item').length).toBe(5);
    wrapper.unmount();
  });
});

