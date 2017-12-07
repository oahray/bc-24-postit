import React from 'react';
import { shallow } from 'enzyme';

import { mockServer, mockStore } from '../../../__mocks__/mockConfig'
import ConnectedNewGroup, { NewGroup } from '../../../containers/NewGroup';

let props;
const token = 'hjghsytudyru';

const user = {
  id: 12,
  username: 'arya',
  email: 'arya@test.com'
}

const groupList = [];

const newGroup = {
  id: 7,
  name: 'my new group',
  description: '',
  type: 'public'
};

const funcs = {
  resetCreatedGroupStatus: jest.fn(),
}

// Add spies for relevant functions/methods
const resetStatusSpy = jest.spyOn(funcs, 'resetCreatedGroupStatus');

const setup = (group) => {
  props = {
    user,
    groupList,
    createdGroup: group,
    token,
    // Action creators
    resetCreatedGroupStatus: funcs.resetCreatedGroupStatus,
  };
  return shallow(<NewGroup {...props} />);
};

describe('NewGroup component', () => {
  test('renders without crashing', () => {
    const wrapper = setup();
    expect(wrapper.length).toBe(1);
  });

  // test('sets state and performs search when input value changes', () => {
  //   const wrapper = setup();
  //   const event = {
  //     target: {
  //       value: 'es'
  //     }
  //   }
  //   wrapper.find('#search').simulate('change', event);
  //   expect(wrapper.instance().state.username).toBe('es');
  //   expect(resetCreatedGroupStatusSpy).toHaveBeenCalledTimes(1);

  //   event.target.value = '';
  //   wrapper.find('#search').simulate('change', event);
  //   expect(wrapper.instance().state.username).toBe('');
  //   expect(resetCreatedGroupStatusSpy).toHaveBeenCalledTimes(1);
  // });
  
  // test('performs search when form is submitted', () => {
  //   const wrapper = setup();
  //   const event = {
  //     preventDefault: jest.fn()
  //   };

  //   wrapper.setState({
  //     username: 'ra'
  //   });
    
  //   wrapper.find('form').simulate('submit', event);
  //   expect(resetCreatedGroupStatusSpy).toHaveBeenCalledTimes(2);
  // });
});

describe('Connected NewGroup component', () => {
  test('renders without crashing', () => {
    const store = mockStore({
      user,
      groupList,
      createdGroup: newGroup,
      token
    });
    const wrapper = shallow(<ConnectedNewGroup store={store} />);
    expect(wrapper.length).toBe(1);
  });
});

