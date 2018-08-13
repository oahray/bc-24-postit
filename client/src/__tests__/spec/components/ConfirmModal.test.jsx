import React from 'react';
import { mount } from 'enzyme';
import ConfirmModal from '../../../components/ConfirmModal';

describe('ConfirmModal component', () => {
  const mockFn = {
    confirm: jest.fn(() => ({}))
  };
  const confirmSpy = jest.spyOn(mockFn, 'confirm');

  test('should mount without crashing', () => {
    const wrapper = mount(<ConfirmModal modalId="confirm-delete-1"
    confirmText="Sure you want to delete this?"
      triggerLabel="delete" callback={mockFn.confirm} />);

    expect(wrapper.length).toBe(1);
  });

  test('should confirm choice when button is clicked', () => {
    const wrapper = mount(<ConfirmModal modalId="confirm-delete-1"
    confirmText="Sure you want to delete this?"
      triggerLabel="delete" callback={mockFn.confirm} />);

    wrapper.find('.modal-confirm').simulate('click');
    expect(confirmSpy).toBeCalled();
  });
});
