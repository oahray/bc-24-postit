import React, { Component} from  'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, Link } from 'react-router-dom';
import { Navbar, NavItem, Icon, Carousel, Button } from 'react-materialize';
import GuestCarousel from './GuestCarousel';
import { verifyAuth } from '../actions';

class GuestHome extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='guest-home center'>
        <div>
          <h5>Welcome to Postit!</h5>
          <p> Postit is a communication-driven community that provides to: </p>
        </div>
         <GuestCarousel />
        <div>
          <p> To dive right into the experience,</p>
          <Link to='/signup'> Signup </Link>
          or 
          <Link to='/signin'> Signin </Link>  
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.isAuthenticated
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ verifyAuth }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(GuestHome);
