import React from 'react';
import { shallow } from 'enzyme';

import { mockStore } from '../../../__mocks__/mockConfig';
import NotFoundConnected, { NotFound } from '../../../components/NotFound';

const funcs = {
  goBack: jest.fn()
};

const goBackSpy = jest.spyOn(funcs, 'goBack');

const setup = (loading, path) => {
  const props = {
    verifyAuthLoading: loading,
    match: {
      path
    },
    history: {
      ...funcs
    }
  };

  return <NotFound {...props} />;
};


describe('Not Found component', () => {
  test('does not render when auth verification is still loading', () => {
    const wrapper = shallow(setup(true, '*'));
    expect(wrapper.length).toBe(1);
  });

  test('goes back if the path does not match the catch-all route for non-existent routes', () => {
    const wrapper = shallow(setup(false, '/'));
    expect(wrapper.length).toBe(1);
    expect(goBackSpy).toHaveBeenCalledTimes(1);
  });

  test('redirects to homepage if route does not exist', () => {
    const wrapper = shallow(setup(false, '*'));
    expect(wrapper.length).toBe(1);
  });
});

describe('Connected NotFound component', () => {
  test('renders without crashing', () => {
    const store = mockStore({
      verifyAuthLoading: true
    });

    const wrapper = shallow(<NotFoundConnected store={store} />);

    expect(wrapper.length).toBe(1);
  });
});
