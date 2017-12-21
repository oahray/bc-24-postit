import React from 'react';
import { mount } from 'enzyme';
import Preloader from '../../../components/Preloader';

describe('Preloader component', () => {
  test('should mount', () => {
    const wrapper = mount(<Preloader message="Please wait..."/>);
    expect(wrapper.length).toBe(1);
  });
});
