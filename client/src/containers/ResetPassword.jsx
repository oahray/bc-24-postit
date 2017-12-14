import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { resetPassword } from '../actions';


/**
 * @class
 */
export class ResetPassword extends Component {
  /**
   * @constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
      resetHash: $.deparam(window.location.search).t
    };
    this.resetPassword = this.resetPassword.bind(this);
  }

  /**
   * @function resetPassword
   * @param {Onject} e: form event object
   * @returns {Object | undefined} dispatch action creator
   */
  resetPassword(e) {
    e.preventDefault();
    if (this.state.password !== this.state.confirmPassword) {
      return $('.reset-password-message').text('Passwords do not match!');
    }
    this.props.resetPassword(this.state.password, this.state.resetHash);
  }

  /**
   * @function render
   * @returns {Object} resetPassword jsx component
   */
  render() {
    const resetErrorMessage = (
      <div className='reset-password-message red-text'>
        <p className="center">{this.props.resetPasswordError}</p>
      </div>
    );
    return (
      <form className="row reset-password-form" onSubmit={this.resetPassword}>
        <div className="center">
          <h5 className="page-header">Reset Your Password</h5>
          <h6>Enter your new password</h6>
        </div>
        <div className="col s12 m8 offset-m2 row forgot-password">
          <div className='input-field col s12'>
            <i class="material-icons prefix">lock</i>
            <input id='reset-password1' type="password" required
            value={this.state.password} onChange={event =>
              this.setState({ password: event.target.value })}/>
            <label for="reset-password1">New Password</label>
          </div>

          <div className='input-field col s12'>
            <i class="material-icons prefix">lock</i>
            <input id='reset-password2' type="password" required
            value={this.state.confirmPassword} onChange={event =>
              this.setState({ confirmPassword: event.target.value })}/>
            <label for="reset-password2">Confirm Password</label>
          </div>
          <div className="col s12 center">
            {resetErrorMessage}
          </div>

          <div className="center">
            <button
            className="btn reset-password-btn waves-effect waves-teal white main-text-color"
            type="submit">{this.props.resetPasswordLoading ?
            'Saving your changes...' : 'Change password'}</button>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  resetPasswordError: state.resetPasswordError,
  resetPasswordLoading: state.resetPasswordLoading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ resetPassword }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
