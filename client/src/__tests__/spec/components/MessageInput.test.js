import React from 'react';
import { shallow } from 'enzyme';

import MessageInput from '../../../components/MessageInput';

const funcs = {
  onInputChange: jest.fn(),
  onSelectChange: jest.fn(),
  onButtonChange: jest.fn()
};

const props = {
  inputValue: '',
  selectValue: 'normal'
};

describe('MessageInput Component', () => {
  test('should mount correctly', () => {
    const wrapper = shallow(<MessageInput {...props} {...funcs} />);
    expect(wrapper.find('.message-input-container').length).toBe(1);
  });
});

