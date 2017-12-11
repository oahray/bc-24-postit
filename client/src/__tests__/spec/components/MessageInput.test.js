import React from 'react';
import { shallow } from 'enzyme';

import MessageInput from '../../../components/MessageInput';

const funcs = {
  onInputChange: jest.fn(),
  onSelectChange: jest.fn(),
  onButtonChange: jest.fn()
}

const props = {
  inputValue: '',
  selectValue: 'normal'
}

const inputSpy = jest.spyOn(funcs, 'onInputChange');
const selectSpy = jest.spyOn(funcs, 'onSelectChange');
const buttonSpy = jest.spyOn(funcs, 'onButtonChange');

describe('MessageInput Component', () => {
  test('should mount correctly', () => {
    const wrapper = shallow(<MessageInput {...props} {...funcs} />);
    expect(wrapper.find('.message-input-container').length).toBe(1);
  });
});

