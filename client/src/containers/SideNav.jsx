import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../actions';

class SideNav extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $('.button-collapse').sideNav();
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
          <li className='center'><h4 className='teal-text'>{this.props.user.username} | POSTIT</h4></li>
          <li><a href="#">Create New Group</a></li>
          <li className='active'>
            <ul class="collapsible teal-text" data-collapsible="accordion">
              <li>
                <div class="collapsible-header"><i class="material-icons">filter_drama</i>My Groups</div>
                <div class="collapsible-body"><ul>
                  {this.props.groups.map((group) => {
                    return (<li key={group.id}>
                      <div className='center'>
                        {group.name} <br/> created by {group.createdBy}
                      </div>
                    </li>)
                  })} </ul>
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
              <a href="#!" className="brand-logo">Postit</a>
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