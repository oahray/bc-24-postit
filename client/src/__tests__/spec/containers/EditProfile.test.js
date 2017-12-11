import React from 'react';
import { shallow } from 'enzyme';

import { mockServer, mockStore } from '../../../__mocks__/mockConfig'
import ConnectedEditProfile, { EditProfile } from '../../../containers/EditProfile';
import { Redirect } from 'react-router-dom';
import * as editOptions from '../../../actions/auth/editProfile';

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
    ...actionCreators
  };
  return shallow(<EditProfile {...props} />);
}

describe('Edit Profile component', () => {
  test('should render without crashing', () => {
    const wrapper = setup(currentUser);
    expect(wrapper.find('.edit-profile-page').length).toBe(1);
  });

  test('should let user edit profile', () => {
    const wrapper = setup(currentUser);

    wrapper.instance().edit();
    expect(wrapper.instance().state.editingInfo).toBe(true);

    const event = {
      target: {
        value: 'new_name',
        files: ['1',' 2']
      }
    };

    wrapper.instance().onInputChange(event, 'name');
    expect(wrapper.instance().state.name).toBe('new_name');

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
    expect(wrapper.instance().state.imageUrl).toBe("");

    wrapper.instance().save();
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