import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class NotFound extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * @returns {jsx | function | null}
   */
  render() {
    if (this.props.verifyAuthLoading) {
      return null;
    } else if (!this.props.match.path === '*') {
      return this.props.history.goBack();
    }
    return (<Redirect to='/' />);
  }
}

const mapStateToProps = state => ({
  user: state.user,
  verifyAuthLoading: state.verifyAuthLoading,
  isLoggedIn: state.isAuthenticated,
  verifyAuthFailed: state.verifyAuthFailed,
  token: state.token
});

export default connect(mapStateToProps)(NotFound);
