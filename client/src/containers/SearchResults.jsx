import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import {
  getGroupMessages, inGroupPage, clearUserSearchTerm,
  searchUsers, addUserToGroup, removeUser, getGroupUsers, leaveGroup
} from '../actions';
import UsersList from '../components/UsersList';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import SearchList from '../components/SearchList';

/**
 * @class SearchResult
 */
export class SearchResult extends Component {
  /**
   * @constructor
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.searchQuery = $.deparam(window.location.search);
    this.state = {
      searchTerm: this.searchQuery.u,
      page: Number(this.searchQuery.p),
      offset: 7 * (Number(this.searchQuery.p) - 1),
      limit: 7,
      lastPage: 0
    };

    this.groupId = Number(this.props.match.params.groupid);
    this.searchDone = this.searchDone.bind(this);
    this.setSearchTerm = this.setSearchTerm.bind(this);
    this.searchUsers = this.searchUsers.bind(this);
    this.addUser = this.addUser.bind(this);
    this.initMaterial = this.initMaterial.bind(this);
    this.removeUser = this.removeUser.bind(this);
    this.updateSearchResult = this.updateSearchResult.bind(this);
    this.updateUsersList = this.updateUsersList.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  /**
   * @returns {undefined}
   */
  componentWillMount() {
    if (!this.props.selectedGroup) {
      this.props.getGroupMessages(this.groupId, this.props.token);
    }
    if (!this.props.groupUsers) {
      this.props.getGroupUsers(this.groupId, this.props.token);
    }
    if (this.searchQuery && this.searchQuery.u.length > 0) {
      this.updateSearchResult();
    }
  }

  /**
   * @returns {undefined}
   */
  componentDidMount() {
    this.initMaterial();
    this.props.inGroupPage(true);
    this.props.getGroupUsers(this.groupId, this.props.token);
    this.setState({
      searchTerm: this.searchQuery.u
    });

    const socket = io();
    socket.on('Added to group', ({ group }) => {
      if (group.id === this.groupId) {
        this.updateUsersList();
        this.updateSearchResult();
      }
    });
    socket.on('Removed from group', ({ user, group }) => {
      if (group.id === this.groupId) {
        if (this.props.user && user.id === this.props.user.id) {
          return this.props.history.push('/');
        }
        this.updateUsersList();
        this.updateSearchResult();
      }
    });
  }

  /**
   * @param {Object} newProps
   * @param {Object} newState
   * @returns {undefined}
   */
  componentDidUpdate(newProps, newState) {
    if (this.state.page !== newState.page) {
      this.updateSearchResult();
    }
    this.initMaterial();
  }

  /**
   * @function initMaterial
   * @description initializes materialcss components
   * @returns {undefined}
   */
  initMaterial() {
    $('.modal').modal();
    $('.tooltipped').tooltip({ delay: 50, html: true });
    $('.collapsible').collapsible();
  }

  /**
   * @param {string} username: the username search string search
   * @returns {undefined}
   */
  setSearchTerm(username) {
    this.setState({
      searchTerm: username
    });
  }


  /**
   * @returns {undefined}
   * @param {string} username: the username search string
   * @param {string} resultPath: the path to redirect to
   */
  searchUsers(username, resultPath) {
    this.setState({
      searchTerm: username
    }, () => {
      const { selectedGroup, token } = this.props;
      this.props.searchUsers(selectedGroup.id, username, 0, 7, token);
      this.props.history.push(resultPath);
    });
  }

  /**
   * @returns {undefined}
   */
  searchDone() {
    this.props.clearUserSearchTerm();
    this.props.history.push(`/groups/${this.props.selectedGroup.id}/messages`);
  }

  /**
   * @param {string} username
   * @returns {undefined}
   */
  addUser(username) {
    this.props.addUserToGroup(
      username,
      this.props.selectedGroup.id,
      this.props.token
    );
  }

  /**
   * @param {string} username
   * @returns {undefined}
   */
  removeUser(username) {
    this.props.removeUser(
      username,
      this.props.selectedGroup.id,
      this.props.token
    );
  }

  /**
   * @returns {undefined}
   */
  updateUsersList() {
    this.props.getGroupUsers(this.groupId, this.props.token);
  }

  /**
   * @returns {undefined}
   */
  updateSearchResult() {
    if (this.state.searchTerm) {
      this.props.searchUsers(
        this.props.match.params.groupid,
        this.state.searchTerm,
        this.state.offset,
        this.state.limit,
        this.props.token
      );
    }
  }

  /**
   * @param {Object} e: click event object
   * @returns {undefined}
   */
  onPageChange(e) {
    if (e.target.id !== this.state.page) {
      this.setState({
        page: e.target.id,
        offset: 7 * (e.target.id - 1)
      });
      this.props.history.push(`/groups/${
        this.props.selectedGroup.id
        }/addusers?u=${this.state.searchTerm}&p=${e.target.id}`);
    }
  }

  /**
   * @returns {undefined}
   */
  previousPage() {
    if (this.state.page > 1) {
      this.setState({
        page: this.state.page - 1,
        offset: this.state.offset - 7
      });
      this.props.history.push(`/groups/${
        this.props.selectedGroup.id}/addusers?u=${
        this.state.searchTerm}&p=${Number(this.state.page) - 1}`);
    }
  }

  /**
   * @function
   * @returns {undefined}
   */
  nextPage() {
    const lastPage = Math.ceil(
      this.props.userSearchResults.totalCount / this.state.limit
    );
    if (this.state.page < lastPage) {
      this.setState({
        page: this.state.page + 1,
        offset: this.state.offset + 7
      });
      this.props.history.push(`/groups/${this.props.selectedGroup.id
        }/addusers?u=${this.state.searchTerm}&p=${Number(this.state.page) + 1}`);
    }
  }

  /**
   * @returns {jsx} - Search result component
   */
  render() {
    if (this.props.groupMessagesFailed) {
      return (<Redirect to="/" />);
    }

    if (this.props.groupMessagesLoading || !this.props.selectedGroup) {
      return (<h5 className="center">Please wait...</h5>);
    }

    const usersCount = (<h6 className="center">
    {this.props.userSearchResults.totalCount ?
      this.props.userSearchResults.totalCount : 'No'}
      {this.props.userSearchResults.totalCount === 1 ?
        ' user ' : ' users '} found</h6>);

    return (
      <div className='row search-page col s12 m8'>
        <div className="search-results-container col s12 m9">
          <div className='col s12'>
            <h5 className='page-header center'>
              Search and Add Users to
              <strong> '{this.props.selectedGroup.name}'</strong>
            </h5>
          </div>
          <div className='col s12 center'>
            <div className='col s10 center'>
              <SearchBar
                searchUsers={this.searchUsers}
                user={this.props.user}
                selectedGroup=
                {this.props.selectedGroup}
                setSearchTerm={this.setSearchTerm}/>
            </div>
            <div>
              <a className='btn search-done-btn white main-text-color'
                onClick={this.searchDone}>Done</a>
            </div>
          </div>

          <SearchList
            state={this.state} usersCount={usersCount}
            userSearchResults={this.props.userSearchResults}
            addUser={this.addUser}
          />

          {this.props.userSearchResults.totalCount > 0 ?
          <Pagination state={this.state}
            previousPage={this.previousPage}
            userSearchResults={this.props.userSearchResults}
            onPageChange={this.onPageChange}
            nextPage={this.nextPage} /> : ''}
        </div>

        <div className="users-list col s12 m3">
          <ul>
            <UsersList user={this.props.user}
              groupUsers={this.props.groupUsers}
              removeUser={this.removeUser}
              leaveGroup={this.props.leaveGroup}
              selectedGroup={this.props.selectedGroup} />
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  selectedGroup: state.selectedGroup,
  groupUsers: state.groupUsers,
  groupMessagesLoading: state.groupMessagesLoading,
  groupMessagesFailed: state.groupMessagesFailed,
  token: state.token,
  userSearchResults: state.userSearchResults,
  userSearchTerm: state.userSearchTerm
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getGroupMessages,
  inGroupPage,
  clearUserSearchTerm,
  searchUsers,
  addUserToGroup,
  removeUser,
  getGroupUsers,
  leaveGroup
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
