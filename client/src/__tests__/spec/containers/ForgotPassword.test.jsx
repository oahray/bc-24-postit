import React from 'react';
import { shallow } from 'enzyme';

import { mockServer, mockStore } from '../../../__mocks__/mockConfig'
import ConnectForgotPassword, { ForgotPassword } from '../../../containers/ForgotPassword';

let props;

const actionCreators = {
  requestReset: jest.fn(),
  clearResetRequestMessage: jest.fn()
}

const requestSpy = jest.spyOn(actionCreators, 'requestReset');
const clearMessageSpy = jest.spyOn(actionCreators, 'clearResetRequestMessage');

const setup = (loading, success, message = 'some message') => {
  const props = {
    requestResetLoading: loading,
    requestResetSuccess: success,
    requestResetMesssage: message,
    // Action creators
    requestReset: actionCreators.requestReset,
    clearResetRequestMessage: actionCreators.clearResetRequestMessage
  };
  return shallow(<ForgotPassword {...props} />);
};

describe('ForgotPassword component', () => {
  test('renders without crashing', () => {
    const wrapper = setup(false, false, null);
    expect(wrapper.find('.request-reset-form').length).toBe(1);
  });

  test('displays message when request finishes', () => {
    const wrapper = setup(false, null, null);
    const form = wrapper.find('.request-reset-form');
    const input = wrapper.find('.forgot-password-input');

    form.simulate('submit', { preventDefault: jest.fn() });
    expect(requestSpy).not.toBeCalled();

    input.simulate('change', { target: { value: 'stranger@example.com' } });

    form.simulate('submit', { preventDefault: jest.fn() });
    expect(requestSpy).toBeCalled();
  });

  test('disables button when request is processing', () => {
    const wrapper = setup(true, false, null);
    const btn = wrapper.find('.request-reset-btn');
    expect(btn.text()).toBe('Sending...');
    wrapper.unmount();
    expect(clearMessageSpy).toBeCalled();
  });
});

describe('Connected ForgotPassword', () => {
  test('renders without crashing', () => {
    const store = mockStore({
      requestResetLoading: false,
      requestResetMessage: {
        requestResetSuccess: false,
        requestResetMesssage: ''
      }
    });
    
    const wrapper = shallow(<ConnectForgotPassword store={store} />);
    expect(wrapper.length).toBe(1);
  });
});
