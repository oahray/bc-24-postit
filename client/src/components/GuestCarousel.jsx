import React, { Component } from 'react';
import { Carousel, Icon } from 'react-materialize';

export default class GuestCarousel extends Component {
  constructor(props) {
    super(props);
    this.interval = null;
  }

  componentDidMount() {
    $('.carousel').carousel();
    this.intervalId = setInterval(() => { 
      $('.carousel').carousel('next'); }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div id="guest-carousel" className="carousel">
        <div className='carousel-item white teal-text'>
          <h2><Icon>wc</Icon></h2>
          <p>Connect with your friends</p>
        </div>
        <div className='carousel-item white teal-text'>
          <h2><Icon>people</Icon></h2>
          <p>Create groups to suit your style</p>
        </div>
        <div className='carousel-item white teal-text'>
          <h2><Icon>person_add</Icon></h2>
          <p>Add friends to your groups</p>
        </div>
        <div className='carousel-item white teal-text'>
          <h2><Icon>mode_edit</Icon></h2>
          <p>Send messages with fitting priority level</p>
        </div>
        <div className='carousel-item white teal-text'>
          <h2><Icon>notifications_active</Icon></h2>
          <p>Get real-time notifications even when you are not logged in</p>
        </div>
      </div>
    )
  }
}