import React from 'react';
import { shallow, mount } from 'enzyme';
import { mock, mockStore } from '../../../__mocks__/mockConfig';
import ProfileEditor from '../../../components/ProfileEditor';

const user = {
  id: 2,
  username: 'sammy',
  email: 'sammy@test.com',
  about: 'New to Postit',
  imageUrl: ''
};

const state = {
  about: '',
  email: '',
  imageUrl: '/pics/profile.png',
  uploading: false
}

const funcs = {
  save: jest.fn(),
  endEdit: jest.fn(),
  onInputChange: jest.fn(),
  removeImage: jest.fn()
}

const saveSpy = jest.spyOn(funcs, 'save');
const endEditSpy = jest.spyOn(funcs, 'endEdit');
const inputChangeSpy = jest.spyOn(funcs, 'onInputChange');
const removeImageSpy = jest.spyOn(funcs, 'removeImage');

describe('ProfileEditor component', () => {
  const wrapperFn = () => shallow(<ProfileEditor
    user={user} endEdit={funcs.endEdit} state={state}
    save={funcs.save} removeImage={funcs.removeImage}
    onInputChange={funcs.onInputChange}/>);

  test('should mount without crashing', () => {
    const wrapper = wrapperFn();
    expect(wrapper.find('.edit-profile-card').length).toBe(1);
    expect(wrapper.find('.edit-profile-card .editor-header').text()).toBe('Edit Profile');
  });

  test('should allow user change input values', () => {
    state.uploading = true;
    const wrapper = wrapperFn();
    wrapper.find('#edit-about').simulate('change', { target: { value: 'A changed person'}});
    expect(inputChangeSpy).toHaveBeenCalledTimes(1);
    wrapper.find('#edit-email').simulate('change', { target: { value: 'newsammy@test.com'}});
    expect(inputChangeSpy).toHaveBeenCalledTimes(2);
  });
});

