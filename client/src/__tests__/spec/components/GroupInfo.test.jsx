import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { mock, mockStore } from '../../../__mocks__/mockConfig';
import GroupInfo from '../../../components/GroupInfo';

describe('GroupInfo component', () => {
  test('should mount without crashing', () => {
    const mockFn = {
      edit: jest.fn(),
      delete: jest.fn()
    };

    const user = {
      id: 2,
      username: 'ray'
    };
    const group = {
      id: 3,
      name: 'Test group',
      description: 'Group for test purposes',
      type: 'public',
      createdBy: 'ray'
    };
    const editInfoSpy = jest.spyOn(mockFn, 'edit');
    const deleteGroupSpy = jest.spyOn(mockFn, 'delete');
    const InfoComponent = () => <GroupInfo
    user={user} selectedGroup={group}
    editInfo={mockFn.edit} deleteGroup={mockFn.delete} />;

    const wrapper = () => shallow(InfoComponent());
    expect(wrapper().find('.group-info-ul').length).toBe(1);

    user.username = 'randomDude';
    group.description = '';

    expect(wrapper().find('.group-description').text()).toBe(' No description added.')
  });
});