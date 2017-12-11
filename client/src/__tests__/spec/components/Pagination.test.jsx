import React from 'react';
import { shallow, mount } from 'enzyme';
import { mock, mockStore } from '../../../__mocks__/mockConfig';
import Pagination from '../../../components/Pagination';

const state = {
  page: 1,
  offset: 0,
  limit: 5
}

const results = {
  totalCount: 13
}

const funcs = {
  previousPage: jest.fn(),
  nextPage: jest.fn(),
  onPageChange: jest.fn(),
  removeImage: jest.fn()
}

const previousPageSpy = jest.spyOn(funcs, 'previousPage');
const nextPageSpy = jest.spyOn(funcs, 'nextPage');
const pageChangeSpy = jest.spyOn(funcs, 'onPageChange');
const removeImageSpy = jest.spyOn(funcs, 'removeImage');

describe('Pagination component', () => {
  const wrapperFn = () => shallow(<Pagination
    nextPage={funcs.nextPage} state={state}
    previousPage={funcs.previousPage} userSearchResults={results}
    onPageChange={funcs.onPageChange}/>);

  test('should mount without crashing', () => {
    const wrapper = wrapperFn();
    expect(wrapper.find('.pagination').length).toBe(1);
  });

  test('should disable navigation icons when necessary', () => {
    expect(wrapperFn().find('#previous-page').hasClass('disabled')).toEqual(true);
    expect(wrapperFn().find('#next-page').hasClass('disabled')).toEqual(false);

    state.page = 3;
    const wrapper = wrapperFn();
    expect(wrapperFn().find('#previous-page').hasClass('disabled')).toEqual(false);
    expect(wrapperFn().find('#next-page').hasClass('disabled')).toEqual(true);
  });
});

