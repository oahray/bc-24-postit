import React from 'react';
import { shallow } from 'enzyme';
import GroupInfo from '../../../components/GroupInfo';

describe('GroupInfo component', () => {
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

  const InfoComponent = () => <GroupInfo
  user={user} selectedGroup={group}
  editInfo={mockFn.edit} deleteGroup={mockFn.delete} />;

  test('should render group info', () => {
    const wrapper = () => shallow(InfoComponent());
    expect(wrapper().find('.group-info-ul').length).toBe(1);
  });

  test('should render place holder when group has no description',
  () => {
    const wrapper = () => shallow(InfoComponent());
    user.username = 'randomDude';
    group.description = '';

    expect(wrapper().find('.group-description')
    .text()).toBe(' No description added.');
  });
});
