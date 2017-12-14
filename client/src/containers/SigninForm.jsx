import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { signinUser, verifyAuth, clearFormError } from '../actions';

/**
 * @class
 */
export class SigninForm extends Component {
  /**
   * @constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  /**
   * @function componentWillUnmount
   * @returns {undefined}
   */
  componentWillUnmount() {
    if (this.props.signinError) {
      this.props.clearFormError();
    }
  }

  /**
   * @function onFormSubmit
   * @description called when the form
   * on submit even fires
   * @param {Object} event
   * @returns {undefined}
   */
  onFormSubmit(event) {
    event.preventDefault();
    this.props.signinUser(this.state.username, this.state.password);
  }

  /**
   * @function render
   * @description react component render method
   * @returns {Object} jsx Signin component
   */
  render() {
    if (this.props.isLoggedIn) {
      return (<Redirect to="/" />);
    }

    return (
      <div className='forms row col s12 m8 l6'>
        <form className='row signin-form col s12 m10 offset-m1 z-depth-2'
        onSubmit={this.onFormSubmit}>
          <h4 className="page-header center"> Sign in </h4>
          <div className="form-error-message center red-text bold">
            <h6>{this.props.signinFailed ? this.props.signinError : null}</h6>
          </div>
          <div className='input-field col s12'>
            <i class="material-icons prefix">person</i>
            <input type="text" id="signin-username" class="autocomplete" autoFocus value={this.state.username} required onChange={event => this.setState({ username: event.target.value })} />
            <label for="signin-username">Username</label>
          </div>
          <br/>
          <div className="input-field col s12">
            <i class="material-icons prefix">lock</i>
            <input type="password" id="signin-password"
            value={this.state.password} required onChange={event =>
              this.setState({ password: event.target.value })} />
            <label for="signin-password">Password</label>
          </div>
          <div className="center" >
            <button className={`btn signin-btn white main-text-color waves-teal 
            ${this.props.signinLoading ?
              'disabled' : ''}`}
              type="submit"> {this.props.signinLoading
              ? 'Please wait...' : 'Submit'} </button>
          </div>
          <div className='center'>
            <p className='center'> Forgot Password?
            <Link to="/forgotpassword"> Recover Password </Link></p>
            <p className='center'> New to Postit?
            <Link to="/signup"> Sign Up </Link></p>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.isAuthenticated,
  signinLoading: state.authFormLoading,
  signinFailed: state.authFormFailed,
  signinError: state.authFormErrorMessage
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    signinUser,
    verifyAuth,
    clearFormError
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SigninForm);
