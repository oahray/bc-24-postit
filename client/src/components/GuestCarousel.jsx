import React, { Component } from 'react';
import { Carousel } from 'react-materialize';


export default class GuestCarousel extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.intervalId = setInterval(function () { $('.carousel').carousel('next'); }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <Carousel className='grey' options={{ fullWidth: false }}>
        <div className='white teal-text'>
          <h2>First Panel</h2>
          <p>Connect with friends</p>
        </div>
        <div className='white teal-text'>
          <h2>Second Panel</h2>
          <p>Create groups to suit your style</p>
        </div>
        <div className='white teal-text'>
          <h2>Third Panel</h2>
          <p>Add friends to your groups</p>
        </div>
        <div className='white teal-text'>
          <h2>Fourth Panel</h2>
          <p>Send messages with fitting priority level</p>
        </div>
        <div className='white teal-text'>
          <h2>Fifth Panel</h2>
          <p>Get real-time notifications even when you are not logged in</p>
        </div>
      </Carousel>
    )
  }
}