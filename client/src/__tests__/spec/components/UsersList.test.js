import React from 'react';
import { mount } from 'enzyme';
import UsersList from '../../../components/UsersList';
import ConfirmModal from '../../../components/ConfirmModal';

describe('UsersList component', () => {
  test('should let group creator remove users', () => {
    const mockFn = {
      leave: jest.fn(),
      remove: jest.fn()
    };

    const user = {
      id: 2,
      username: 'ray'
    };
    const groupUsers = [{
      id: 2,
      username: 'ray'
    }, {
      id: 5,
      username: 'jon'
    }];
    const selectedGroup = {
      id: 3,
      name: 'Test group',
      description: 'Group for test purposes',
      type: 'public',
      createdBy: 'ray'
    };

    const removeSpy = jest.spyOn(mockFn, 'remove');

    const wrapper = mount(<UsersList
      user={user} groupUsers={groupUsers}
      selectedGroup={selectedGroup}
      leaveGroup={mockFn.leave} removeUser={mockFn.remove} />);

    expect(wrapper.find(ConfirmModal)).toHaveLength(1);

    expect(wrapper.find('#group-user-list').length).toBe(1);
    expect(wrapper.find('#remove-jon').length).toBe(1);
    wrapper.find('#remove-jon').simulate('click');
    expect(wrapper.find('#user5-modal').length).toBe(1);
    wrapper.find('.modal-confirm').simulate('click');
    expect(removeSpy).toHaveBeenCalledTimes(1);
  });
});

