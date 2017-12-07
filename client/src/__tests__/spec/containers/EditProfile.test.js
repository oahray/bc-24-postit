import React from 'react';
import { shallow } from 'enzyme';

import { mockServer, mockStore } from '../../../__mocks__/mockConfig'
import ConnectedEditProfile, { EditProfile } from '../../../containers/EditProfile';
import { Redirect } from 'react-router-dom';

let props;
const currentUser = {
  id: 6,
  username: 'testuser',
  email: 'testuser@test.com',
  about: '',
  imageUrl: ''
}
const token = 'ds65e89ut976yyre';

const actionCreators = {
  editProfile: jest.fn()
}

const editProfileSpy = jest.spyOn(actionCreators, 'editProfile');

const setup = (user) => {
  props = {
    user,
    token,
    // Action creators
    signinUser: actionCreators.signinUser,
    verifyAuth: actionCreators.verifyAuth,
    clearFormError: actionCreators.clearFormError
  };
  return shallow(<EditProfile {...props} />);
}

describe('Edit Profile component', () => {
  test('should render without crashing', () => {
    const wrapper = setup(currentUser);
    expect(wrapper.find('.edit-profile-page')).toBeDefined();
  });
});

describe('Connected EditProfile component', () => {
  test('renders without crashing', () => {
    const store = mockStore({
      user: currentUser,
      token
    });
    const wrapper = shallow(<ConnectedEditProfile store={store} />);
    expect(wrapper.length).toBe(1);
  });
});