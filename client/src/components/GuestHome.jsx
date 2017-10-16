import React, { Component} from  'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, Link } from 'react-router-dom';
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
          <h5 className="guest-home-header">Welcome to Postit!</h5>
          <p className="guest-home-text"> Postit is a communication-driven community that provides a platform with which you can: </p>
        </div>
         <GuestCarousel />
        <div className="guest-home-text">
          <p> To dive right into the experience,</p>
          <Link to='/signup'> Signup </Link>
          or 
          <Link to='/signin'> Signin </Link>  
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.isAuthenticated
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ verifyAuth }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GuestHome);
