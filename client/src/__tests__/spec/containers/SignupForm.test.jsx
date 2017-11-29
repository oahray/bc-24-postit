import React from 'react';
import { shallow } from 'enzyme';

import { mockServer, mockStore } from '../../../__mocks__/mockConfig'
import ConnectedSignup, { SignupForm } from '../../../containers/SignupForm';

let props;
let errorMessage = 'Username/Password is incorrect';

const actionCreators = {
  signupUser: jest.fn(),
  verifyAuth: jest.fn(),
  clearFormError: jest.fn()
}

const signupSpy = jest.spyOn(actionCreators, 'signupUser');
const verifySpy = jest.spyOn(actionCreators, 'verifyAuth');
const clearErrorSpy = jest.spyOn(actionCreators, 'clearFormError');

const setup = (isLoggedIn, loading, failed, errorMessage) => {
  props = {
    isLoggedIn,
    signupLoading: loading,
    signupFailed: failed,
    signupError: errorMessage,
    // Action creators
    signupUser: actionCreators.signupUser,
    verifyAuth: actionCreators.verifyAuth,
    clearFormError: actionCreators.clearFormError
  };
  return shallow(<SignupForm {...props} />);
}

describe('Signup form', () => {
  test('should render without crashing', () => {
    const wrapper = setup(false, false, false, errorMessage);
    expect(wrapper.find('.signup-form')).toBeDefined();
  });

  test('should redirect to homepage when user is authenticated', () => {
    const wrapper = setup(true, false, false, errorMessage);
    expect(wrapper.find('.signup-form').length).toBe(0);
  });

  test('should display error message when there is an error', () => {
    const wrapper = setup(false, false, true, errorMessage);
    expect(wrapper.find('.form-error-message').text()).toBe('Username/Password is incorrect');
    wrapper.unmount();
    expect(clearErrorSpy).toBeCalled();
  });

  test('should set state when input values changes', () => {
    const event = {target: {value: "myname"}};
    errorMessage = '';
    const wrapper = setup(false, false, false, errorMessage);
    const form = wrapper.find('.signup-form');
    const usernameInput = wrapper.find('#signup-username');
    const emailInput = wrapper.find('#signup-email');
    const passwordInput = wrapper.find('#signup-password1');
    const confirmInput = wrapper.find('#signup-password2');

    // Simulate change event for username input
    usernameInput.simulate('change', event);

    // Simulate change event for email input
    event.target.value = 'myname@test.com';
    emailInput.simulate('change', event);

    // Simulate change event for password input
    event.target.value = 'mypassword';
    passwordInput.simulate('change', event);

    event.target.value = 'mypassworde';
    confirmInput.simulate('change', event);

    expect(wrapper.instance().state.username).toBe('myname');
    expect(wrapper.instance().state.email).toBe('myname@test.com');
    expect(wrapper.instance().state.password).toBe('mypassword');
    expect(wrapper.instance().state.confirmPassword).toBe('mypassworde');

    event.preventDefault = jest.fn();
    form.simulate('submit', event);

    wrapper.unmount();
  });

  test('should call the onSubmit method when form is submitted', () => {
    const event = { preventDefault: jest.fn() };
    const wrapper = setup(false, false, false);
    const form = wrapper.find('.signup-form');

    form.simulate('submit', event);

    expect(signupSpy).toHaveBeenCalledTimes(1);
  });

  test('should disable submit button when request is processing', () => {
    const wrapper = setup(false, true, false, errorMessage);
    const btn = wrapper.find('.signup-btn');
    expect(btn.text()).toBe('Please wait...');
    wrapper.unmount();
    expect(clearErrorSpy).toBeCalled();
  });
});

describe('Connected SignupForm', () => {
  test('renders without crashing', () => {
    const store = mockStore({
      isLoggedIn: true,
      signupLoading: false,
      signupFailed: false,
      signupError: ''
    });
    const wrapper = shallow(<ConnectedSignup store={store} />);
    expect(wrapper.length).toBe(1);
  });
});
