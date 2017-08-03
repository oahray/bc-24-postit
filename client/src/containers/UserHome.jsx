import React, { Component } from 'react';

export default class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }
  }
  render() {
    return (
      < div className='center'>
        <p> Welcome {this.props.user.username}! You are now logged in.</p>
      </div>
    )
  }
}