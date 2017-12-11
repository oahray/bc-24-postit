import React from 'react';
import { shallow } from 'enzyme';

import GroupInfoModal from '../../../components/GroupInfoModal';

let props;
const selectedGroup = {
  id: 3,
  name: 'Test group',
  description: 'Group for test purposes',
  type: 'public',
  createdBy: 'ray'
};

const actionCreators = {
  editInfo: jest.fn()
}

const editInfoSpy = jest.spyOn(actionCreators, 'editInfo');

const setup = (group) => {
  props = {
    selectedGroup: group,
    modalId: 'group3-modal',
    triggerLabel: 'Edit Group',
    // Action creators
    editInfo: actionCreators.editInfo
  };
  return shallow(<GroupInfoModal {...props} />);
}

describe('Group Info Modal', () => {
  test('should render without crashing', () => {
    const wrapper = setup();
    expect(wrapper.find('#group3-modal').length).toBe(1);
  });

  test('should allow user input new group details and save', () => {
    const newName = 'New Group Name';
    const newDesc = 'This is the new description';
    const newType = 'private';
    selectedGroup.description = '';
    
    // For group name input
    const event = { target: { value: newName}}
    const wrapper = setup(selectedGroup);
    expect(wrapper.instance().state.name).toBe(selectedGroup.name);
    wrapper.find('#group-name-input').simulate('change', event);
    expect(wrapper.instance().state.name).toBe(newName);

    // For group description input
    event.target.value = newDesc;
    expect(wrapper.instance().state.description).toBe(selectedGroup.description);
    wrapper.find('#group-desc-input').simulate('change', event);
    expect(wrapper.instance().state.description).toBe(newDesc);


    // For group type select
    event.target.value = newType;
    expect(wrapper.instance().state.type).toBe(selectedGroup.type);
    wrapper.find('#group-privacy-select').simulate('change', event);
    expect(wrapper.instance().state.type).toBe(newType);

    // Save
    wrapper.find('#save-group-info a').simulate('click');
    expect(editInfoSpy).toHaveBeenCalledTimes(1);
  });
});
