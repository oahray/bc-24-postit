import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink, Link } from 'react-router-dom';
import { logout } from '../actions';
import SearchBar from './SearchBar';

class SideNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inGroup: true
    }
  }

  componentDidMount() {
    $('.button-collapse').sideNav({
      closeOnClick: true
    });
    $('.collapsible').collapsible();
  }

  render() {
    let navList = (
      <ul className="right hide-on-med-and-down">
        <li><NavLink to="/">About</NavLink></li>
        <li><NavLink to="/signin">Signin</NavLink></li>
        <li><NavLink to="/signup">Signup</NavLink></li>
        <li><a target='_blank' href="https://github.com.oahray/bc-24-postit">View Project On Github</a></li>
      </ul>
    );

    let sideList = (
      <ul className="side-nav fixed" id="mobile-demo">
        <li className="center teal-text"><h3>Postit</h3></li>
        <li><NavLink to="/">About</NavLink></li>
        <li><NavLink to="/signin">Signin</NavLink></li>
        <li><NavLink to="/signup">Signup</NavLink></li>
        <li><a target='_blank' href="https://github.com.oahray/bc-24-postit">View Project On Github</a></li>
      </ul>
    );

    if (this.props.isLoggedIn) {
      navList = (
        <ul className="right hide-on-med-and-down">
          <li><a href="#">New Group</a></li>
          <li className='active'><a href="#">My Groups</a></li>
          <li><a href='#'>My Profile</a></li>
          <li><a href='#'>Logout</a></li>
        </ul>
      );
      sideList = (
        <ul className="side-nav fixed" id="mobile-demo">
          <li><div class="user-view">
            <a href="#!name"><span class="white-text name">{this.props.user.username}</span></a>
            <a href="#!email"><span class="white-text email">{this.props.user.email}</span></a>
          </div>
          </li>
          <li className='search'> 
            {this.state.inGroup ? <SearchBar /> : null}
          </li>
          <li className='my-list-item'><a href="#"
          onClick={() => {this.setState({inGroup: !this.state.inGroup})}}>Create New Group</a></li>
          <li className=''>
            <ul class="collapsible teal-text" data-collapsible="accordion">
              <li className='my-list-item'>
                <div class="collapsible-header"> My Groups </div>
                <div class=" sidebar-grouplist collapsible-body">
                  <ul>
                    <li className='my-list-item active'><Link to='/'>All Groups</Link></li>
                    <div> {this.props.groups.map((group) => {
                      return (<li key={group.id}>
                        <div className='my-list-item'>
                          {group.name} -- created by {group.createdBy}
                        </div>
                      </li>)
                    })} </div>
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
            <div className="nav-wrapper teal lighten-1">
              <a href="#!" className="brand-logo center">Postit</a>
              <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
              {/* {navList} */}
            </div>
          </nav>
        </div>
        {sideList}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    isLoggedIn: state.isAuthenticated,
    groups: state.groupList
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({logout}, dispatch)
} 

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);