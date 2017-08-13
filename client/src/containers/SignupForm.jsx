import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { Modal, Row, Input, Button } from 'react-materialize';

import { signupUser, verifyAuth } from '../actions';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentWillMount() {
    if (window.localStorage.getItem('x-auth')) {
      const token = window.localStorage.getItem('x-auth');
      this.props.verifyAuth(token);
    }
  }

  onFormSubmit(event) {
    event.preventDefault();
    if ( this.state.confirmPassword !== this.state.password) {
      return console.log('Passwords do not match!');
    }
    this.props.signupUser(this.state.username, this.state.password, this.state.email);
  }

  render() {
    const content = (
      <div className='signupForm'>
        <h3 className="page-header"> Sign up </h3>
        <form className='row' 
        onSubmit={this.onFormSubmit}>
          <Input s={12} label="Username" onChange={event => this.setState({ username: event.target.value})}/>
          <Input type="email" label="Email" s={12} validate onChange={event => this.setState({ email: event.target.value})}/>
          <Input type="password" label="Password" s={12} onChange={event => this.setState({ password: event.target.value})}/>
          <Input type="password" label="Confirm password" s={12} onChange={event => this.setState({ confirmPassword: event.target.value})}/>
          <div className='center'>
            <Button className='white teal-text' waves='light' type='submit'>Submit</Button>
          </div>
          <div className='bold teal-text'>
            <p> Have an account? <Link to="/signin">Sign In </Link></p>
          </div>
        </form>
      </div>
    )
    return (
      <div>
        {this.props.isLoggedIn ? <Redirect to="/dashboard" /> : content }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.isAuthenticated
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signupUser, verifyAuth }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm)