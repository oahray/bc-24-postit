import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { getGroupMessages, inGroupPage, clearUserSearchTerm,
  searchUsers, addUserToGroup, getGroupUsers } from '../actions';
import { UsersList } from '../components/GroupHelpers';

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.searchQuery = $.deparam(window.location.search);
    this.state = {
      searchTerm: this.searchQuery.u,
      page: this.searchQuery.p,
      offset: 10 * (this.searchQuery.p - 1),
      limit: 10,
      lastPage: 0
    }
    this.searchDone = this.searchDone.bind(this);
    this.addUser = this.addUser.bind(this);
    this.updateSearchResult = this.updateSearchResult.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  componentWillMount() {
    const groupId = this.props.match.params.groupid;
    if (!this.props.selectedGroup) {
      this.props.getGroupMessages(groupId, this.props.token);
    }
    if (!this.props.groupUsers) {
      this.props.getGroupUsers(groupId, this.props.token);
    }
    this.updateSearchResult();
  }

  componentDidMount() {
    this.props.inGroupPage(true);
  }

  componentDidUpdate(newProps, newState) {
    if (this.state.page !== newState.page) {
      this.updateSearchResult();
    }
  }

  searchDone() {
    this.props.clearUserSearchTerm();
    this.props.history.push(`/groups/${this.props.selectedGroup.id}/messages`);
  }

  addUser(username) {
    console.log(`${username} was added to ${this.props.selectedGroup.name}`);
    this.props.addUserToGroup(
      username,
      this.props.selectedGroup.id,
      this.updateSearchResult,
      this.props.token
    );
  }

  updateSearchResult() {
    this.props.searchUsers(
      this.props.match.params.groupid, 
      this.state.searchTerm, 
      this.state.offset, 
      this.state.limit, 
      this.props.token
    );
  }

  onPageChange(e) {
    if (e.target.id !== this.state.page) {
      console.log('Page changed!');
      this.setState({
        page: e.target.id,
        offset: 10 * (e.target.id - 1)
      });
      this.props.history.push(`/groups/${this.props.selectedGroup.id}/addusers?u=${this.state.searchTerm}&p=${e.target.id}`);
    }
  }

  previousPage() {
    console.log('Page changed!');
    if (this.state.page > 1) {
      this.setState({
        page: this.state.page - 1,
        offset: this.state.offset - 10
      });
      this.props.history.push(`/groups/${this.props.selectedGroup.id}/addusers?u=${this.state.searchTerm}&p=${Number(this.state.page) - 1}`);
    }
  }

  nextPage() {
    console.log('Page changed!');
    const lastPage = Math.ceil(this.props.userSearchResults.count / this.state.limit);
    if (this.state.page < lastPage) {
      this.setState({
        page: this.state.page + 1,
        offset: this.state.offset + 10
      });
      this.props.history.push(`/groups/${this.props.selectedGroup.id}/addusers?u=${this.state.searchTerm}&p=${Number(this.state.page) + 1}`);
    }
  }

  render() {
    if (this.props.groupMessagesFailed) {
      return <h5>sorry... You cannot add users to a group you do not belong to</h5>
    }
    if (this.props.groupMessagesLoading || !this.props.selectedGroup) {
      return <h5>Please wait...</h5>
    }
    return (
      <div className='row search-page col s12 m8'>
        <div className="search-results-container col s12 m9">
          <div className='col s12'>
            <h5 className='page-header'>Add Users to <strong>{this.props.selectedGroup.name}</strong></h5>
          </div>
          <div className='col s12 center'>
            <a className='btn white teal-text' onClick={this.searchDone}>Done</a>
          </div>

          <div className='search-list-container col s10 offset-s1 m8 offset-m2 l6 offset-l3'>
            <h6>{this.props.userSearchResults.count} found</h6>
            <ul className='row list-group'> 
              {this.props.userSearchResults.users?(this.props.userSearchResults.users).map((user) => <li key={user.id}><div className='col s12 list-item grey lighten-3'><strong>{user.username}</strong> <br /> <small>{user.about}</small> <span className='right'><a className='add-user-icon teal-text' onClick={() => this.addUser(user.username)}><i className='material-icons'>person_add</i></a></span></div><hr/></li>) : null }
            </ul>
          </div>

          <div className='col s12 center'>
            <ul class="pagination">
              <li
              class={this.state.page < 2 ? 'disabled' : 'waves-effect'}
              onClick={this.previousPage}
              ><a href="#!"><i class="material-icons">chevron_left</i></a></li>

              {Array.from({ length: Math.ceil(this.props.userSearchResults.count / this.state.limit) }, (v, i) => i + 1).map(i => <li class={i === this.state.page ? 'active' : 'waves-effect'} key={i} onClick={this.onPageChange}><a href="#!" id={i}>{i}</a></li>)}

              <li class={this.state.page < Math.ceil(this.props.userSearchResults.count / this.state.limit) ? 'waves-effect' : 'disabled'} 
              onClick={this.nextPage} >
                <a href="#!">
                  <i class="material-icons">chevron_right</i>
                </a></li>
            </ul>
          </div>
        </div>
        <div className="users-list col s12 m3">
          <UsersList user={this.props.user} groupUsers={this.props.groupUsers} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    selectedGroup: state.selectedGroup,
    groupUsers: state.groupUsers,
    groupMessagesLoading: state.groupMessagesLoading,
    groupMessagesFailed: state.groupMessagesFailed,
    token: state.token,
    userSearchResults: state.userSearchResults,
    userSearchTerm: state.userSearchTerm
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getGroupMessages,
    inGroupPage,
    clearUserSearchTerm,
    searchUsers,
    addUserToGroup,
    getGroupUsers
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
