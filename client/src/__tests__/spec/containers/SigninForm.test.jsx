import React from 'react';
import { shallow } from 'enzyme';

import { mockServer, mockStore } from '../../../__mocks__/mockConfig'
import ConnectedSignin, { SigninForm } from '../../../containers/SigninForm';
import { Redirect } from 'react-router-dom';
import { clearFormError } from '../../../actions/index';

let props;
let errorMessage = 'Username/Password is incorrect';

const actionCreators = {
  signinUser: jest.fn(),
  verifyAuth: jest.fn(),
  clearFormError: jest.fn()
}

const signinSpy = jest.spyOn(actionCreators, 'signinUser');
const verifySpy = jest.spyOn(actionCreators, 'verifyAuth');
const clearErrorSpy = jest.spyOn(actionCreators, 'clearFormError');

const setup = (isLoggedIn, loading, failed, errorMessage) => {
  props = {
    isLoggedIn,
    signinLoading: loading,
    signinFailed: failed,
    signinError: errorMessage,
    // Action creators
    signinUser: actionCreators.signinUser,
    verifyAuth: actionCreators.verifyAuth,
    clearFormError: actionCreators.clearFormError
  };
  return shallow(<SigninForm {...props} />);
}

describe('Signin form', () => {
  test('should render without crashing', () => {
    const wrapper = setup(false, false, false, errorMessage);
    expect(wrapper.find('.signin-form')).toBeDefined();
  });

  test('should redirect to homepage when user is authenticated', () => {
    const wrapper = setup(true, false, false, errorMessage);
    expect(wrapper.find('.signin-form').length).toBe(0);
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
    const usernameInput = wrapper.find('#signin-username');
    const passwordInput = wrapper.find('#signin-password');

    // Simulate change event for usernsme input
    usernameInput.simulate('change', event);

    // Simulate change event for password input
    event.target.value = 'mypassword';
    passwordInput.simulate('change', event);

    expect(wrapper.instance().state.username).toBe('myname');
    expect(wrapper.instance().state.password).toBe('mypassword');
    wrapper.unmount();
  });

  test('should call the onSubmit method when form is submitted', () => {
    const event = { preventDefault: jest.fn() };
    const wrapper = setup(false, false, false);
    const form = wrapper.find('.signin-form');
    form.simulate('submit', event);

    expect(signinSpy).toHaveBeenCalledTimes(1);
  });

  test('should disable submit button when request is processing', () => {
    const wrapper = setup(false, true, false, errorMessage);
    expect(wrapper.find('.signin-btn').text()).toBe(' Please wait... ');
    wrapper.unmount();
    expect(clearErrorSpy).toBeCalled();
  });
});

describe('Connected SigninForm', () => {
  test('renders without crashing', () => {
    const store = mockStore({
      isLoggedIn: true,
      signinLoading: false,
      signinFailed: false,
      signinError: ''
    });
    const wrapper = shallow(<ConnectedSignin store={store} />);
    expect(wrapper.length).toBe(1);
  });
});
