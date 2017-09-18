import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal, Row, Input, Button } from 'react-materialize';

import { signupUser, verifyAuth, clearFormError } from '../actions';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentWillUnmount() {
    if (this.props.signupError) {
      this.props.clearFormError();
    }
  }

  onFormSubmit(event) {
    event.preventDefault();
    if ( this.state.confirmPassword !== this.state.password) {
      console.log('Passwords do not match!');
      return $('.form-error-message').text('Passwords do not match!');
    }
    this.props.signupUser(this.state.username, this.state.password, this.state.email);
  }

  render() {
    const content = (
      <div className='row forms col s12 m8 l6'>
        <form className='row col s12 m10 offset-m1 z-depth-2'
        onSubmit={this.onFormSubmit}>
          <h3 className="page-header"> Sign up </h3>
          <div className='form-error center red-text bold'>
            <h6 className='form-error-message'>{this.props.signupFailed ? this.props.signupError : null}</h6>
          </div>
          <div className="input-field col s12">
            <i class="material-icons prefix">person</i>
            <input id='sign-up-username' type='text' autoFocus required value={this.state.username} onChange={event => this.setState({ username: event.target.value })}/>
            <label for="signup-username">Username</label>
          </div>

          <div className='input-field col s12'>
            <i class="material-icons prefix">email</i>
            <input id='signup-email' type="email" required className='validate' value={this.state.email} onChange={event => this.setState({ email: event.target.value })}/>
            <label for="signup-email">Email</label>
          </div>

          <div className='input-field col s12'>
            <i class="material-icons prefix">lock</i>
            <input id='signup-password1' type="password" required value={this.state.password} onChange={event => this.setState({ password: event.target.value })}/>
            <label for="signup-password1">Password</label>
          </div>

          <div className='input-field col s12'>
            <i class="material-icons prefix">lock</i>
            <input id='signup-password2' type="password" required value={this.state.confirmPassword} onChange={event => this.setState({ confirmPassword: event.target.value })}/>
            <label for="signup-password2">Confirm Password</label>
          </div>
          <div className='center'>
            <Button className={`white teal-text ${this.props.setUserLoading? 'disabled' : ''}`} waves='light' type='submit'>{this.props.setUserLoading ? 'Please wait...' : 'Submit'}</Button>
          </div>
          <div className='main-text-color'>
            <p className='center'> Have an account? <Link to="/signin">Sign In </Link></p>
          </div>
        </form>
      </div>
    );
    return (
      <div>
        {this.props.isLoggedIn ? <Redirect to="/dashboard" /> : content }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.isAuthenticated,
    signupLoading: state.authFormLoading,
    signupFailed: state.authFormFailed,
    signupError: state.authFormErrorMessage
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signupUser, verifyAuth, clearFormError }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
