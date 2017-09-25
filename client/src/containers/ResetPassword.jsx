import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { resetPassword } from '../actions';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
      resetHash: $.deparam(window.location.search).t
    };
    this.resetPassword = this.resetPassword.bind(this);
  }

  resetPassword(e) {
    e.preventDefault();
    if (this.state.password !== this.state.confirmPassword) {
      return $('.reset-password-message').text('Passwords do not match!');
    }
    this.props.resetPassword(this.state.password, this.state.resetHash);
  }

  render() {
    const resetErrorMessage = (
      <div className='reset-password-message red-text'>
        <p className="center">{this.props.resetPasswordError}</p>
      </div>
    );
    return (
      <form className="row" onSubmit={this.resetPassword}>
        <div className="center">
          <h5 className="page-header">Reset Your Password</h5>
          <h6>Enter your new password</h6>
        </div>
        <div className="col s12 m8 offset-m2 row forgot-password">
          <div className='input-field col s12'>
            <i class="material-icons prefix">lock</i>
            <input id='signup-password1' type="password" required value={this.state.password} onChange={event => this.setState({ password: event.target.value })}/>
            <label for="signup-password1">New Password</label>
          </div>

          <div className='input-field col s12'>
            <i class="material-icons prefix">lock</i>
            <input id='signup-password1' type="password" required value={this.state.confirmPassword} onChange={event => this.setState({ confirmPassword: event.target.value })}/>
            <label for="signup-password1">Confirm Password</label>
          </div>
          <div className="col s12 center">
            {resetErrorMessage}
          </div>

          <div className="center">
            <button
            className="btn waves-effect waves-teal white teal-text" type="submit">{this.props.resetPasswordLoading ? 'saving your changes...' : 'change password'}</button>
          </div>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    resetPasswordError: state.resetPasswordError,
    resetPasswordLoading: state.resetPasswordLoading
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ resetPassword }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
