import React from 'react';
import { shallow } from 'enzyme';

import SearchBar from '../../../components/SearchBar';

let props;
const token = 'hjghsytudyru';

const group = {
  id: 7,
  name: 'my new group',
  description: '',
  type: 'public'
};

const funcs = {
  searchUsers: jest.fn(),
}

console.log(io);

// Add spies for relevant functions/methods
const searchUsersSpy = jest.spyOn(funcs, 'searchUsers');

const setup = () => {
  props = {
    selectedGroup: group,
    // Action creators
    searchUsers: funcs.searchUsers,
  };
  return shallow(<SearchBar {...props} />);
};

describe('SearchBar component', () => {
  test('renders without crashing', () => {
    const wrapper = setup();
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('form').length).toBe(1);
  });

  test('sets state and performs search when input value changes', () => {
    const wrapper = setup();
    const event = {
      target: {
        value: 'es'
      }
    }
    wrapper.find('#search').simulate('change', event);
    expect(wrapper.instance().state.username).toBe('es');
    expect(searchUsersSpy).toHaveBeenCalledTimes(1);

    event.target.value = '';
    wrapper.find('#search').simulate('change', event);
    expect(wrapper.instance().state.username).toBe('');
    expect(searchUsersSpy).toHaveBeenCalledTimes(1);
  });
  
  test('performs search when form is submitted', () => {
    const wrapper = setup();
    const event = {
      preventDefault: jest.fn()
    };

    wrapper.setState({
      username: 'ra'
    });
    
    wrapper.find('form').simulate('submit', event);
    expect(searchUsersSpy).toHaveBeenCalledTimes(2);
  });
});

