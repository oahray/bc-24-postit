import React from 'react';
import { shallow } from 'enzyme';

import RouteHandler from '../../../routes';

let props;

const actionCreators = {
  verifyAuth: jest.fn(),
};

const verifyAuthSpy = jest.spyOn(actionCreators, 'verifyAuth');

const setup = (isLoggedIn) => {
  props = {
    isLoggedIn
  };
  return shallow(<RouteHandler {...props} />);
}

describe('RouteHandler', () => {
  test('renders authenticated routes without crashing', () => {
    const wrapper = setup(true);
    expect(wrapper.length).toBe(1);
  });

  test('renders unauthenticated routes without crashing', () => {
    const wrapper = setup(false);
    expect(wrapper.length).toBe(1);
  });
});