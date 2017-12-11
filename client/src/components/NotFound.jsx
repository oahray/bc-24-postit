import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

/**
 * @class
 */
export class NotFound extends Component {
  /**
   * @returns {Object | function | null} redirects or
   * does nothing based on current route
   */
  render() {
    if (this.props.verifyAuthLoading) {
      return <div>{null}</div>;
    } else if (this.props.match.path !== '*') {
      return <div>{this.props.history.goBack()}</div>;
    }
    return (<Redirect to='/' />);
  }
}

const mapStateToProps = state => ({
  verifyAuthLoading: state.verifyAuthLoading,
});

export default connect(mapStateToProps)(NotFound);
