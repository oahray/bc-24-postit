import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class NotFound extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Redirect to='/' />
    )
  }
}