import React from 'react';
import { shallow } from 'enzyme';
import Pagination from '../../../components/Pagination';

const state = {
  page: 1,
  offset: 0,
  limit: 5
};

const results = {
  totalCount: 13
};

const funcs = {
  previousPage: jest.fn(),
  nextPage: jest.fn(),
  onPageChange: jest.fn(),
  removeImage: jest.fn()
};

describe('Pagination component', () => {
  const wrapperFn = () => shallow(<Pagination
    nextPage={funcs.nextPage} state={state}
    previousPage={funcs.previousPage} userSearchResults={results}
    onPageChange={funcs.onPageChange}/>);

  test('should mount without crashing', () => {
    const wrapper = wrapperFn();
    expect(wrapper.find('.pagination').length).toBe(1);
  });

  test(`should disable previous page navigation
  when user is in the first page`,
  () => {
    expect(wrapperFn().find('#previous-page')
    .hasClass('disabled')).toEqual(true);
    expect(wrapperFn().find('#next-page')
    .hasClass('disabled')).toEqual(false);
  });

  test(`should disable next page navigation
  when user is in the last page`,
  () => {
    state.page = 3;
    expect(wrapperFn().find('#previous-page')
    .hasClass('disabled')).toEqual(false);
    expect(wrapperFn().find('#next-page').hasClass('disabled')).toEqual(true);
  });
});

