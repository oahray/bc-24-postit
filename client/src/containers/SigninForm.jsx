import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Modal, Row, Input, Button } from 'react-materialize';

import { signinUser, verifyAuth } from '../actions'

class SigninForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
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
    this.props.signinUser(this.state.username, this.state.password);
  }

  render() {
    if (this.props.isLoggedIn) { 
      return (<Redirect to="/dashboard" />)
    }

    return (
      <div className='forms col s12 m8 l6'>
        <h3 className="page-header"> Sign in </h3>
        <form className='row' 
        onSubmit={this.onFormSubmit}>
          <Input s={12} label="Username" value={this.state.username} onChange={event => this.setState({ username: event.target.value})} />
          <Input type="password" label="Password" s={12} value={this.state.password} onChange={event => this.setState({ password: event.target.value})} />
          <div className='center'>
            <Button className='white teal-text' waves='teal' type='submit'> Submit </Button>
          </div>
          <div className='center'>
            <p className='center'> Forgot Password? <Link to="/forgotpassword">Get Recovery Email</Link></p>
            <p className='center'> New to Postit? <Link to="/signup">Sign Up</Link></p>
          </div>
        </form>
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
  return bindActionCreators({ signinUser, verifyAuth }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SigninForm)