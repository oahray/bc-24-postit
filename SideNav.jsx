import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink, Link } from 'react-router-dom';
import { logout, getGroupList } from '../actions';
import SearchBar from './SearchBar';

const $ = window.$;

class SideNav extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $('.button-collapse').sideNav();
    $('.collapsible').collapsible();
    $('nav-wrapper ul li').click(function() {
      $(this).siblings('li').removeClass('active');
      $(this).addClass('active');
    })
    if (this.props.user) {
      this.props.getGroupList(this.props.token);
    }
  }

  openNewGroupModal() {
    $('#newGroupModal').modal('open');
  }

  render() {
    let navList = (
      <ul className='right hide-on-med-and-down'>
        <li><NavLink to='/'>About</NavLink></li>
        <li><NavLink to='/signin'>Signin</NavLink></li>
        <li><NavLink to='/signup'>Signup</NavLink></li>
        <li><a target='_blank' href='https://github.com.oahray/bc-24-postit'>View Project On Github</a></li>
      </ul>
    );

    let sideList = (
      <ul className='side-nav fixed' id='side-nav'>
        <li className='center teal-text'><h3>Postit</h3></li>
        <li><NavLink to='/'>About</NavLink></li>
        <li><NavLink to='/signin'>Signin</NavLink></li>
        <li><NavLink to='/signup'>Signup</NavLink></li>
        <li><a target='_blank' href='https://github.com.oahray/bc-24-postit'>View Project On Github</a></li>
      </ul>
    );

    if (this.props.isLoggedIn) {
      navList = (
        <ul className='right hide-on-med-and-down'>
          <li><a href='#'>New Group</a></li>
          <li><a href='#'>My Groups</a></li>
          <li><a href='#'>My Profile</a></li>
          <li><a href='#'>Logout</a></li>
        </ul>
      );
      sideList = (
        <ul className='side-nav fixed' id='side-nav'>
          <li><div class='user-view center valign-wrapper row'>
            <span className='col'><i className='material-icons white-text center'>person</i></span>
            <a class='white-text name'> lolzz {`@${this.props.user.username}`}</a>
             <a class='white-text email'>{this.props.user.email}</a> 
          </div>
          </li>
          <li className='search'> 
            {this.props.inGroupPage ? <SearchBar /> : null}
          </li>
          <li className='my-list-item'><NavLink to='/groups/new'> Create New Group</NavLink></li>
          <li className='my-list-item'>
            <ul class='collapsible collapsible-accordion'>
              <li className='my-list-item'>
                <a class='collapsible-header'> My Groups </a>
                <div class='sidebar-grouplist collapsible-body'>
                  <ul className='sidebar-group-list'>
                    <li className='my-list-item'><NavLink to='/'>All Groups</NavLink></li>
                    {this.props.groups.map((group) => {
                      return (<li key={group.id}><Link to={`/groups/${group.id}/messages`}>
                        <div className='my-list-item'>
                          {group.name} -- by {group.createdBy}
                        </div>
                        </Link>
                      </li>)
                    })}
                  </ul>
                </div>
              </li>
            </ul> 
          </li>
          <li><a href='#'>Edit Profile</a></li>
          <li><a href='#' onClick={() => this.props.logout()}>Logout</a></li>
        </ul>
      );
    }

    return (
      <div>
        <div className='navbar-fixed'>
          <nav>
            <div className='nav-wrapper teal lighten-1'>
              <a href='#!' className='brand-logo center'>Postit</a>
              <a href='#' data-activates='side-nav' className='button-collapse'><i className='material-icons'>menu</i></a>
            </div>
          </nav>
        </div>
        {sideList}
        {newGroupModal}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    isLoggedIn: state.isAuthenticated,
    token: state.token,
    groups: state.groupList,
    inGroupPage: state.inGroupPage
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({logout, getGroupList}, dispatch)
} 

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);