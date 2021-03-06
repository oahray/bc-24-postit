import React from 'react';
import { shallow } from 'enzyme';

import { mockStore } from '../../../__mocks__/mockConfig';
import ConnectedEditProfile, { EditProfile } from '../../../containers/EditProfile';
import * as editOptions from '../../../actions/auth/editProfile';

let props;
const currentUser = {
  id: 6,
  username: 'testuser',
  email: 'testuser@test.com',
  about: '',
  imageUrl: ''
};

const token = 'ds65e89ut976yyre';

const actionCreators = {
  editProfile: jest.fn()
};

const editProfileSpy = jest.spyOn(actionCreators, 'editProfile');

const setup = (user) => {
  props = {
    user,
    token,
    // Action creators
    ...actionCreators
  };
  return shallow(<EditProfile {...props} />);
};

describe('Edit Profile component', () => {
  const event = {
    target: {
      value: 'new_name',
      files: ['1', ' 2']
    }
  };

  test('should render without crashing', () => {
    const wrapper = setup(currentUser);
    expect(wrapper.find('.edit-profile-page').length).toBe(1);
  });

  test(`should set editingInfo state to true when
  edit method is called`, () => {
    const wrapper = setup(currentUser);

    wrapper.instance().edit();
    expect(wrapper.instance().state.editingInfo).toBe(true);
  });

  test(`should set name property of component state
  to true when edit method is called`, () => {
    const wrapper = setup(currentUser);

    wrapper.instance().onInputChange(event, 'name');
    expect(wrapper.instance().state.name).toBe('new_name');
  });

  test('should allow user upload and remove files', () => {
    const wrapper = setup(currentUser);
    editOptions.uploadImage = () => Promise.resolve({
      data: {
        fileUrl: '/my-photo.png'
      }
    });

    wrapper.instance().pickImage(event);
    expect(wrapper.instance().state.imageFile).toBe(event.target.files[0]);

    const imageUrl = '/my-pic.png';
    wrapper.instance().setState({ imageUrl });
    expect(wrapper.instance().state.imageUrl).toBe(imageUrl);
    wrapper.instance().removeImage();
    expect(wrapper.instance().state.imageUrl).toBe('');
  });

  test('should allow user save profile', () => {
    setup(currentUser).instance().save();
    expect(editProfileSpy).toHaveBeenCalledTimes(1);
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
