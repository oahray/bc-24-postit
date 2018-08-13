import React from 'react';
import { shallow } from 'enzyme';
import { Redirect } from 'react-router-dom';

import { mockStore } from '../../../__mocks__/mockConfig';
import ConnectedNewGroup, { NewGroup } from '../../../containers/NewGroup';

let props;
const token = 'hjghsytudyru';

const user = {
  id: 12,
  username: 'arya',
  email: 'arya@test.com'
};

const groupList = [];

const newGroup = {
  id: 7,
  name: 'my new group',
  description: '',
  type: 'public'
};

const funcs = {
  resetCreateGroupStatus: jest.fn(),
  createNewGroup: jest.fn()
};

// Add spies for relevant functions/methods
const resetStatusSpy = jest.spyOn(funcs, 'resetCreateGroupStatus');
const createGroupSpy = jest.spyOn(funcs, 'createNewGroup');

const setup = (group) => {
  props = {
    user,
    groupList,
    createdGroup: group,
    token,
    // Action creators
    ...funcs
  };
  return shallow(<NewGroup {...props} />);
};

describe('NewGroup component', () => {
  const event = { target: {}, preventDefault: jest.fn() };

  test('renders without crashing', () => {
    const wrapper = setup();
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('.new-group-page').length).toBe(1);
  });

  test('redirects when group is created successfully', () => {
    const wrapper = setup(newGroup);
    expect(wrapper.find(Redirect).length).toBe(1);
  });

  test('save input values to state when they are typed', () => {
    const groupName = 'New Group Name';
    const groupDesc = 'This is my first group';
    const groupType = 'private';

    const wrapper = setup();
    event.target.value = groupName;
    wrapper.find('.new-group-name').simulate('change', event);

    event.target.value = groupDesc;
    wrapper.find('.new-group-desc').simulate('change', event);

    event.target.value = groupType;
    wrapper.find('#new-group-type').simulate('change', event);

    expect(wrapper.instance().state.name).toBe(groupName);
    expect(wrapper.instance().state.description).toBe(groupDesc);
    expect(wrapper.instance().state.type).toBe(groupType);
  });

  test('allows user submit form', () => {
    const wrapper = setup();
    wrapper.find('.new-group-form').simulate('submit', event);
    expect(createGroupSpy).toHaveBeenCalledTimes(1);

    wrapper.unmount();
    expect(resetStatusSpy).toHaveBeenCalledTimes(1);
  });
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
