import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import Preloader from '../../../components/Preloader'

describe('Preloader component', () => {
  test('should mount', () => {
    mount(<Preloader message="Please wait..."/>)
  });
});
