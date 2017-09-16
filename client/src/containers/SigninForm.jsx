import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Modal, Row, Input, Button } from 'react-materialize';

import { signinUser, verifyAuth, clearFormError } from '../actions';

class SigninForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentWillUnmount() {
    if (this.props.signinError) {
      this.props.clearFormError();
    }
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.signinUser(this.state.username, this.state.password);
  }

  render() {
    if (this.props.isLoggedIn) { 
      return (<Redirect to="/" />);
    }

    return (
      <div className='forms row col s12 m8 l6'>
        <form className='row col s12 m10 offset-m1 z-depth-2' 
        onSubmit={this.onFormSubmit}>
          <h3 className="page-header"> Sign in </h3>
          <div className='form-error-message center red-text bold'>
            <h6>{this.props.signinFailed ? this.props.signinError : null}</h6>
          </div>
          <div className='input-field col s12'>
            <i class="material-icons prefix">person</i>
            <input type="text" id="signin-username" class="autocomplete" autoFocus value={this.state.username} required onChange={event => this.setState({ username: event.target.value })} />
            <label for="signin-username">Username</label>
          </div>
          <br/>
          <div className='input-field col s12'>
            <i class="material-icons prefix">lock</i>
            <input type="password" id='signin-password' value={this.state.password} required onChange={event => this.setState({ password: event.target.value })} />
            <label for="signin-password">Password</label>
          </div>
          <div className='center' >
            <Button className={`white teal-text ${this.props.signinLoading ? 'disabled' : ''}`} waves='teal' type='submit'> {this.props.signinLoading ? 'Please wait...' : 'Submit'} </Button>
          </div>
          <div className='center'>
            <p className='center'> Forgot Password? <Link to="/forgotpassword">Get Recovery Email</Link></p>
            <p className='center'> New to Postit? <Link to="/signup">Sign Up</Link></p>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.isAuthenticated,
    signinLoading: state.authFormLoading,
    signinFailed: state.authFormFailed,
    signinError: state.authFormErrorMessage
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signinUser,
    verifyAuth,
    clearFormError
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SigninForm);
