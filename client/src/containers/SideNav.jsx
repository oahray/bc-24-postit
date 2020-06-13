import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { logout, getGroupList, searchUsers } from '../actions';

/**
 * @class SideNav
 */
export class SideNav extends Component {
  /**
   * @constructor
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.searchUsers = this.searchUsers.bind(this);
  }

  /**
   * @function componentDidMount
   * @description: Component life-cycle method that
   * is called before the component mounts
   * @returns {undefined}
   */
  componentDidMount() {
    this.initMaterial();
    $('.side-nav .my-list-item a').click(() => {
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
   * @function componentDidUpdate
   * @description: Component life-cycle method that
   * is called when the component updates
   * @returns {undefined}
   */
  componentDidUpdate() {
    this.initMaterial();
  }

  /**
   * @function initMaterial
   * @description initializes material components
   * @returns {undefined}
   */
  initMaterial() {
    $('.button-collapse').sideNav();
    $('.collapsible').collapsible();
    $('.tooltipped').tooltip();
  }

  /**
   * @returns {undefined}
   * @param {string} username: the username search string
   * @param {string} resultPath: the path to redirect to on search
   */
  searchUsers(username, resultPath) {
    const { selectedGroup, token } = this.props;
    this.props.searchUsers(selectedGroup.id, username, 0, 7, token);
    this.props.history.push(resultPath);
  }

  /**
   * @function render
   * @description component method that defines what would
   * be rendered by returning it
   * @returns {undefined}
   */
  render() {
    let navList = (
      <ul className='right hide-on-small-only' id=''>
        <li className='my-list-item'><NavLink to='/signin'>Signin</NavLink></li>
        <li className='my-list-item'><NavLink to='/signup'>Signup</NavLink></li>
        <li className='my-list-item docs-link'>
         <a href='/api/v1/docs'>API Docs</a></li>
      </ul>
    );
    let sideList = (
      <ul className='side-nav fixed hide-on-med-and-up' id='side-nav'>
        <li className='my-list-item'><NavLink to='/signin'>Signin</NavLink></li>
        <li className='my-list-item'><NavLink to='/signup'>Signup</NavLink></li>
        <li className='my-list-item docs-link'><a
        href='/api/v1/docs'>API Docs</a></li>
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
          <li>
            <div className='user-view row'>
              <div className='col s3'>
                { this.props.user.imageUrl ?
                <img className="circle"
                src={this.props.user.imageUrl} /> :
                <i className='material-icons white-text center circle'>
                  person
                </i>}
              </div>
              <div className=" col s9 name-email">
                <a className="white-text name page-header tooltipped"
                data-position="right" data-delay="50"
                data-tooltip={this.props.user.username}>
                {this.props.user.username}</a>
                <a className="white-text email page-header tooltipped truncate left"
                data-position="right" data-delay="50"
                data-tooltip={this.props.user.email}>
                {this.props.user.email}</a>
              </div>
            </div>
          </li>
          <li className={`my-list-item ${window.location.pathname === '/groups/new' ? 'active-side-nav z-depth-2' : ''}`}>
            <NavLink to='/groups/new'> Create New Group <i
            className="material-icons left">group_add</i></NavLink>
          </li>
          <li className={`my-list-item ${window.location.pathname === '/' || window.location.pathname.match(/\/groups\/[0-9]+\/messages/) ? 'active-side-nav z-depth-4' : ''}`}>
            <ul className='collapsible collapsible-accordion'>
              <li className=''>
                <a className='collapsible-header'>
                  <i className="material-icons left">group</i> My Groups
                </a>
                <div className='sidebar-grouplist collapsible-body'>
                  <ul className="collection grey">
                    <li className='my-list-item collection-item'>
                      <NavLink to='/'>All Groups</NavLink>
                    </li>
                    {this.props.groups.map(group =>
                      <li key={group.id}
                      className={`my-list-item collection-item ${window.location.pathname.match(`/groups/${group.id}/messages`) ? 'active-side-nav z-depth-4' : ''}`}>
                        <NavLink to={`/groups/${group.id}/messages`}>
                          <div>
                            {group.name}
                          </div>
                        </NavLink>
                      </li>
                    )}
                  </ul>
                </div>
              </li>
            </ul>
          </li>
          <li className={`my-list-item ${window.location.pathname === '/edit' ? 'active-side-nav z-depth-4' : ''}`}>
            <NavLink to="/edit"> My Account
              <i className="material-icons left">settings</i>
            </NavLink>
          </li>
          <li className='my-list-item log-out'><a href='#'
          onClick={() => this.props.logout()}> Logout
            <i className="material-icons left">rowing</i>
          </a></li>
        </ul>
      );
    }

    return (
      <div className="navbar-div">
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
        {this.props.isLoggedIn ? <li>
          <div className="side-footer center valign-wrapper">
            <p><small> ©{(new Date()).getFullYear()} POSTIT</small></p>
          </div>
        </li> : ''}
      </div>
    );
  }
}

SideNav.propTypes = {
  user: PropTypes.object,
  isLoggedIn: PropTypes.bool,
  token: PropTypes.string,
  groups: PropTypes.array,
  selectedGroup: PropTypes.object,
  inGroupPage: PropTypes.bool,
  // Action creators
  logout: PropTypes.func.isRequired
};

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
