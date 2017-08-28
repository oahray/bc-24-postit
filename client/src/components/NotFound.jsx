import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class NotFound extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // if (!this.props.userLoading && !this.props.isLoggedIn) {
    //   console.log(`Page not found, redirecting from ${window.location}`);
    // }
    // console.log('Not Found Props: ', this.props);
  }
  
  render() {
    if (this.props.userLoading) {
      return null;
    } else if (!this.props.match.path === '*') {
      return this.props.history.goBack();
    }
    return <Redirect to='/' />
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    userLoading: state.userLoading,
    isLoggedIn: state.isAuthenticated,
    verifyAuthFailed: state.verifyAuthFailed,
    token: state.token
  }
}

export default connect(mapStateToProps)(NotFound);