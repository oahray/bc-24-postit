import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink, Link } from 'react-router-dom';
import { logout, getGroupList, searchUsers } from '../actions';
import SearchBar from './SearchBar';

class SideNav extends Component {
  constructor(props) {
    super(props);
    this.searchUsers = this.searchUsers.bind(this);
  }

  componentDidMount() {
    $('.button-collapse').sideNav();
    $('.collapsible').collapsible();
    $('.side-nav .my-list-item a').on('click', function (e) {
      const windowSize = $(window).width();
      if (windowSize < 993) {
        $('.button-colllapse').sideNav('hide');
      }
    });
    if (this.props.user) {
      this.props.getGroupList(this.props.token);
    }
    const socket = io();
    socket.on('Added to group', ({ user }) => {
      if (this.props.user && user.id === this.props.user.id) {
        this.props.getGroupList(this.props.token);
      }
    });
  }

  searchUsers(username, resultPath) {
    const { selectedGroup, token } = this.props;
    this.props.searchUsers(selectedGroup.id, username, 0, 10, token);
    this.props.history.push(resultPath);
  }

  render() {
    let navList = (
      <ul className='right' id=''>
        <li className='my-list-item'><NavLink to='/signin'>Signin</NavLink></li>
        <li className='my-list-item'><NavLink to='/signup'>Signup</NavLink></li>
        <li className='my-list-item'><a target='_blank'
          href='https://github.com/oahray/bc-24-postit'>View On Github</a></li>
      </ul>
    );
    let sideList = null;

    let sideListActivator = null;

    if (this.props.isLoggedIn) {
      navList = null;

      sideListActivator = (
        <a href='#' data-activates='side-nav' className='button-collapse'>
          <i className='material-icons'>menu</i>
        </a>);

      sideList = (
        <ul className='side-nav fixed' id='side-nav'>
          <li><div class='user-view center row'>
            <span className='col'><i className='material-icons white-text center'>person</i></span>
            <a class='white-text name'> {this.props.user.username}</a>
            <a class='white-text email'>{this.props.user.email}</a>
          </div>
          </li>
          <li className='search'>
            {this.props.inGroupPage ? <SearchBar searchUsers={this.searchUsers}
              user={this.props.user} selectedGroup={this.props.selectedGroup} /> : null}
          </li>
          <li className='my-list-item'><NavLink to='/groups/new'> Create New Group <i class="material-icons left">group_add</i></NavLink></li>
          <li className=''>
            <ul class='collapsible collapsible-accordion'>
              <li className=''>
                <a class='collapsible-header'> <i class="material-icons left">group</i> My Groups </a>
                <div class='sidebar-grouplist collapsible-body'>
                  <ul>
                    <li className='my-list-item collection'><NavLink to='/'>All Groups</NavLink></li>
                    {this.props.groups.map((group) =>
                      <li key={group.id} className='my-list-item collection-item'>
                        <NavLink to={`/groups/${group.id}/messages`}>
                          <div>
                            {group.name} <small> by {group.createdBy}</small>
                          </div>
                        </NavLink>
                      </li>
                    )}
                  </ul>
                </div>
              </li>
            </ul>
          </li>
          <li className='my-list-item'><NavLink to="/edit"> My Account <i class="material-icons left">settings</i> </NavLink></li>
          <li className='my-list-item'><a href='#' onClick={() => this.props.logout()}> Logout <i class="material-icons left">rowing</i> </a></li>
        </ul>
      );
    }

    return (
      <div>
        <div className='navbar-fixed'>
          <nav>
            <div className='nav-wrapper lighten-1'>
              <a href='/' className='brand-logo'>Postit</a>
              {sideListActivator}
              {navList}
            </div>
          </nav>
        </div>
        {sideList}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    isLoggedIn: state.isAuthenticated,
    token: state.token,
    groups: state.groupList,
    inGroupPage: state.inGroupPage,
    selectedGroup: state.selectedGroup
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logout, getGroupList, searchUsers }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
