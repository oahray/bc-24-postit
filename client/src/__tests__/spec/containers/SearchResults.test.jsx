import React from 'react';
import { shallow } from 'enzyme';

import { mockServer, mockStore } from '../../../__mocks__/mockConfig'
import ConnectSearchResults, { SearchResult } from '../../../containers/SearchResults';
import { addUserToGroup, clearUserSearchTerm } from '../../../actions/index';

let props;
const token = 'hjghsytudyru';

const currentUser = {
  id: 3,
  username: 'stranger',
  email: 'stranger@test.com',
  about: 'New to postit',
  imageUrl: ''
};

const selectedGroup = {
  id: 7,
  name: 'my new group',
  description: '',
  type: 'public'
};

const groupUsers = [{ id: 3,
  username: 'stranger',
  email: 'stranger@test.com',
  about: 'New to postit',
  imageUrl: ''
}];

const results = 
{
  totalCount: 2,
  page: 1,
  users: [
  {
    id: 5,
    username: 'testuser1',
    email: 'testuser1@test.com',
    about: 'New to postit',
    imageUrl: ''
  }, {
    id: 8,
    username: 'testuser2',
    email: 'testuser2@test.com',
    about: 'Awesome me',
    imageUrl: '/images/mypic.png'
  }
]}

const actionCreators = {
  getGroupMessages: jest.fn(),
  inGroupPage: jest.fn(),
  clearUserSearchTerm: jest.fn(),
  searchUsers: jest.fn(),
  addUserToGroup: jest.fn(),
  removeUser: jest.fn(),
  getGroupUsers: jest.fn(),
  leaveGroup: jest.fn(),
  push: jest.fn()
}

console.log(io);

// Add spies for relevant functions/methods
const getMessagesSpy = jest.spyOn(actionCreators, 'getGroupMessages');
const getUsersSpy = jest.spyOn(actionCreators, 'getGroupUsers');
const inPageSpy = jest.spyOn(actionCreators, 'getGroupMessages');
const addUserSpy = jest.spyOn(actionCreators, 'addUserToGroup');
const removeUserSpy = jest.spyOn(actionCreators, 'removeUser');
const clearSearchSpy = jest.spyOn(actionCreators, 'clearUserSearchTerm');


const setup = (user, group, grpUsers, results, failed=false) => {
  props = {
    user,
    selectedGroup: group,
    groupUsers: grpUsers,
    groupMessagesLoading: false,
    groupMessagesFailed: failed,
    token,
    userSearchResults: results,
    userSearchTerm: 'er',
    // router props
    history: {
      push: actionCreators.push
    },
    match: {
      params: {
        groupid: 5
      }
    },
    // Action creators
    ...actionCreators
  };
  return shallow(<SearchResult {...props} />);
};

describe('SearchResults component', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders without crashing', () => {
    const wrapper = setup(null, null, null, []);
    expect(wrapper.length).toBe(1);
    expect(getMessagesSpy).toHaveBeenCalledTimes(1);
    expect(inPageSpy).toHaveBeenCalledTimes(1);
  });

  test('renders error when user does not belong to the group', () => {
    const wrapper = setup(null, null, null, [], true);
    expect(wrapper.find('h5').text()).toBe('sorry... You cannot add users to a group you do not belong to');
  });

  test('renders search results and rerenders when props change', () => {
    const wrapper = setup(currentUser, selectedGroup, [], []);
    expect(wrapper.length).toBe(1);
    wrapper.instance().setState({
      page:1
    });
    wrapper.instance().setState({
      searchTerm: 'e'
    });
    wrapper.instance().setState({
      page:2
    });
  });

  test('calls the addUser when appropriate icon is clicked', () => {
    const wrapper = setup(currentUser, selectedGroup, groupUsers, results);
    expect(wrapper.find
      ('.search-results-container').length).toBe(1);
    // click the add icon on a user in result
    wrapper.find('#add-user5').simulate('click');
    expect(addUserSpy).toHaveBeenCalledTimes(1);
  });

  test('calls the removeUser prop when user the method is called', () => {
    results.totalCount = 1;
    const wrapper = setup(currentUser, selectedGroup, groupUsers, results);
    expect(wrapper.find
      ('.search-results-container').length).toBe(1);
    wrapper.instance().removeUser('testUser1');
    expect(removeUserSpy).toHaveBeenCalledTimes(1);
  });

  test('updates users list when the updateUsersList method is called', () => {
    const wrapper = setup(currentUser, selectedGroup, groupUsers, results);
    expect(wrapper.find
      ('.search-results-container').length).toBe(1);
    wrapper.instance().updateUsersList();
    expect(removeUserSpy).toHaveBeenCalledTimes(1);
  });

  test('allows users jump to a result page', () => {
    const wrapper = setup(currentUser, selectedGroup, groupUsers, results);
    expect(wrapper.find
      ('.search-results-container').length).toBe(1);
    wrapper.instance().setState({ page: 1 })
    wrapper.instance().onPageChange({
      target: {
        id: 1
      }
    });
    expect(wrapper.instance().state.page).toBe(1);

    wrapper.instance().onPageChange({
      target: {
        id: 3
      }
    });
    expect(wrapper.instance().state.page).toBe(3);
  });

  test('allows users go to the previous page', () => {
    const wrapper = setup(currentUser, selectedGroup, groupUsers, results);
    expect(wrapper.find
      ('.search-results-container').length).toBe(1);
    wrapper.instance().setState({ page: 1 })
    // does nothing, since we
    //are on the first page
    wrapper.instance().previousPage();
    expect(wrapper.instance().state.page).toBe(1);

    // go to page 2
    wrapper.instance().setState({ page: 2 })
    expect(wrapper.instance().state.page).toBe(2);

    // call previous page method
    wrapper.instance().previousPage();
    expect(wrapper.instance().state.page).toBe(1);
  });

  test('allows users go to the next page', () => {
    results.totalCount = 11;
    const wrapper = setup(currentUser, selectedGroup, groupUsers, results);
    wrapper.instance().setState({ page: 1 })
    // navigate to second page
    wrapper.instance().nextPage();
    expect(wrapper.instance().state.page).toBe(2);

    // call next page method again
    wrapper.instance().nextPage();
    expect(wrapper.instance().state.page).toBe(2);
  });


  test('redirects when user clicks the done button', () => {
    const wrapper = setup(currentUser, selectedGroup, groupUsers, []);
    wrapper.find
      ('.search-done-btn').simulate('click');
    expect(removeUserSpy).toHaveBeenCalledTimes(1);
  });
});

describe('Connected SearchResults', () => {
  test('renders without crashing', () => {
    const store = mockStore({
      user: {},
      selectedGroup: {},
      groupUsers: [],
      groupMessagesLoading: true,
      groupMessagesFailed: false,
      token,
      userSearchResults: [],
      userSearchTerm: 'ea'
    });
    
    const wrapper = shallow(<ConnectSearchResults store={store} />);
    expect(wrapper.length).toBe(1);
  });
});
