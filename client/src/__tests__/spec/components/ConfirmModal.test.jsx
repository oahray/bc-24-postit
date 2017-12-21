import React from 'react';
import { mount } from 'enzyme';
import ConfirmModal from '../../../components/ConfirmModal';

describe('ConfirmModal component', () => {
  test('should mount without crashing', () => {
    const mockFn = {
      confirm: jest.fn(() => ({}))
    };
    const spiedFn = jest.spyOn(mockFn, 'confirm');

    const wrapper = mount(<ConfirmModal modalId="confirm-delete-1" confirmText="Sure you want to delete this?"
      triggerLabel="delete" callback={mockFn.confirm} />);

    wrapper.find('.modal-confirm').simulate('click');
    expect(spiedFn).toBeCalled();
  });
});
