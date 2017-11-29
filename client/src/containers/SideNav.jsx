import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';
import { logout, getGroupList, searchUsers } from '../actions';
import SearchBar from './SearchBar';

/**
 * @class SideNav
 */
class SideNav extends Component {
  /**
   * @constructor
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.searchUsers = this.searchUsers.bind(this);
  }

  /**
   * @returns {undefined}
   */
  componentDidMount() {
    $('.button-collapse').sideNav();
    $('.collapsible').collapsible();
    $('.side-nav .my-list-item a').on('click', () => {
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
    socket.on('Removed from group', ({ user }) => {
      if (this.props.user && user.id === this.props.user.id) {
        this.props.getGroupList(this.props.token);
      }
    });
  }

  /**
   * @returns {undefined}
   * @param {string} username: the username search string
   * @param {string} resultPath: the path to redirect to on search
   */
  searchUsers(username, resultPath) {
    const { selectedGroup, token } = this.props;
    this.props.searchUsers(selectedGroup.id, username, 0, 10, token);
    this.props.history.push(resultPath);
  }

  /**
   * @returns {undefined}
   */
  render() {
    let navList = (
      <ul className='right hide-on-small-only' id=''>
        <li className='my-list-item'><NavLink to='/signin'>Signin</NavLink></li>
        <li className='my-list-item'><NavLink to='/signup'>Signup</NavLink></li>
        <li className='my-list-item'><a href='/api/v1/docs'>Docs</a></li>
        <li className='my-list-item'><a target='_blank'
          href='https://github.com/oahray/bc-24-postit'>View On Github</a></li>
      </ul>
    );
    let sideList = (
      <ul className='side-nav fixed hide-on-med-and-up' id='side-nav'>
        <li className='my-list-item'><NavLink to='/signin'>Signin</NavLink></li>
        <li className='my-list-item'><NavLink to='/signup'>Signup</NavLink></li>
        <li className='my-list-item'><a href='/api/v1/docs'>Docs</a></li>
        <li className='my-list-item'><a target='_blank'
          href='https://github.com/oahray/bc-24-postit'>View On Github</a></li>
      </ul>
    );

    let sideListActivator = (
        <a href='#' data-activates='side-nav'
        className='button-collapse hide-on-med-and-up'>
          <i className='material-icons'>menu</i>
        </a>);

    if (this.props.isLoggedIn) {
      navList = null;

      sideListActivator = (
        <a href='#' data-activates='side-nav'
        className='button-collapse hide-on-large-only'>
          <i className='material-icons'>menu</i>
        </a>);

      sideList = (
        <ul className='side-nav fixed' id='side-nav'>
          <li><div class='user-view row'>
            <span className='col'><i
            className='material-icons white-text center'>person</i></span>
            <a class='white-text name page-header'> {this.props.user.username}</a>
            <a class='white-text email page-header'>{this.props.user.email}</a>
          </div>
          </li>
          <li className='search'>
            {this.props.inGroupPage ? <SearchBar searchUsers={this.searchUsers}
              user={this.props.user} selectedGroup={this.props.selectedGroup} /> : null}
          </li>
          <li className='my-list-item'>
            <NavLink to='/groups/new'> Create New Group <i
            class="material-icons left">group_add</i></NavLink>
          </li>
          <li className=''>
            <ul class='collapsible collapsible-accordion'>
              <li className=''>
                <a class='collapsible-header'>
                  <i class="material-icons left">group</i> My Groups
                </a>
                <div class='sidebar-grouplist collapsible-body'>
                  <ul className="collection">
                    <li className='my-list-item collection-item'>
                      <NavLink to='/'>All Groups</NavLink>
                    </li>
                    {this.props.groups.map(group =>
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
          <li className='my-list-item'>
            <NavLink to="/edit"> My Account
              <i class="material-icons left">settings</i>
            </NavLink>
          </li>
          <li className='my-list-item'><a href='#'
          onClick={() => this.props.logout()}> Logout
            <i class="material-icons left">rowing</i>
          </a></li>
        </ul>
      );
    }

    return (
      <div>
        <div className='navbar-fixed'>
          <nav>
            <div className='nav-wrapper lighten-1'>
              <NavLink to='/' className='brand-logo'>Postit</NavLink>
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

const mapStateToProps = state => ({
  user: state.user,
  isLoggedIn: state.isAuthenticated,
  token: state.token,
  groups: state.groupList,
  inGroupPage: state.inGroupPage,
  selectedGroup: state.selectedGroup
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ logout, getGroupList, searchUsers }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
