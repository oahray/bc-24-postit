import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getGroupMessages, inGroupPage, clearUserSearchTerm,
  searchUsers, addUserToGroup, removeUser, getGroupUsers, leaveGroup
} from '../actions';
import UsersList from '../components/UsersList';
import UserInfoModal from '../components/UserInfoModal';
import Pagination from '../components/Pagination';

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
    this.updateSearchResult();
  }

  /**
   * @returns {undefined}
   */
  componentDidMount() {
    this.initMaterial();
    const socket = io();
    this.props.inGroupPage(true);
    this.props.getGroupUsers(this.groupId, this.props.token);
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
   * @param {*} newProps
   * @param {*} newState
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
    $('#group-user-list').collapsible('open', 0);
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
      this.updateSearchResult,
      this.props.token
    );
  }

  /**
   * @param {string} username
   * @returns {undefined}
   */
  removeUser(username) {
    this.props.removeUser(username, this.props.selectedGroup.id,
      this.updateUsersList, this.props.token);
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
    this.props.searchUsers(
      this.props.match.params.groupid,
      this.state.searchTerm,
      this.state.offset,
      this.state.limit,
      this.props.token
    );
  }

  /**
   * @param {*} e
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
        this.searchQuery.u}&p=${Number(this.state.page) - 1}`);
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
        }/addusers?u=${this.searchQuery.u}&p=${Number(this.state.page) + 1}`);
    }
  }

  /**
   * @returns {jsx} - Search result component
   */
  render() {
    if (this.props.groupMessagesFailed) {
      return (<h5>sorry... You cannot add users
        to a group you do not belong to</h5>);
    }
    if (this.props.groupMessagesLoading || !this.props.selectedGroup) {
      return (<h5>Please wait...</h5>);
    }
    return (
      <div className='row search-page col s12 m8'>
        <div className="search-results-container col s12 m9">
          <div className='col s12'>
            <h5 className='page-header center'>
              Add Users to '<strong>{this.props.selectedGroup.name}'</strong>
            </h5>
          </div>
          <div className='col s12 center'>
            <a className='btn search-done-btn white main-text-color'
              onClick={this.searchDone}>Done</a>
          </div>

          <div className={`search-list-container col s10
            offset-s1`}>
            <h6 className="center">{this.props.userSearchResults.totalCount ?
              this.props.userSearchResults.totalCount : 'No'}
              {this.props.userSearchResults.totalCount === 1 ?
                ' user ' : ' users '} found</h6>
            <ul className='collection list-group'>
              {this.props.userSearchResults.users ?
                (this.props.userSearchResults.users).map(user =>
                  <li className="collection-item avatar grey lighten-3"
                    key={user.id}>
                    <img
                      src={user.imageUrl ? user.imageUrl :
                        '/images/no-pic.png'} className="circle" />
                    <span className="title">
                      <UserInfoModal user={user} />
                    </span>
                    <p><small>{user.about}</small></p>
                    <span className='secondary-content'>
                      <a id={`add-user${user.id}`}
                        className='add-user-icon main-text-color'
                        onClick={() => this.addUser(user.username)}>
                        <i className='material-icons'>person_add</i>
                      </a>
                    </span>
                  </li>) : null}
            </ul>
          </div>

          {this.props.userSearchResults ? <Pagination state={this.state}
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
