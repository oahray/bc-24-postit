import React, { Component } from 'react';

/**
 * @class GuestCarousel
 * @summary: the carousel at the landing page
 */
export default class GuestCarousel extends Component {
  /**
   * @constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.interval = null;
  }

  /**
   * @function componentDidMount
   * @summary: lifecycle method that
   * fires when react component mounts
   * @returns {undefined}
   */
  componentDidMount() {
    $('.carousel').carousel();
    this.interval = setInterval(() => {
      $('.carousel').carousel('next');
    }, 3000);
  }

  /**
   * @function componentWillUnmount
   * @summary: lifecycle method that fires
   * when react component is about to unmount
   * @returns {undefined}
   */
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  /**
   * @function render
   * @summary: component render method
   * @returns {jsx} instance of GuestCarousel
   */
  render() {
    return (
      <div id="guest-carousel" className="carousel">
        <div className='carousel-item white main-text-color z-depth-4'>
          <h2><i className="material-icons">wc</i></h2>
          <p>Connect with your friends</p>
        </div>
        <div className='carousel-item white main-text-color z-depth-4'>
          <h2><i className="material-icons">people</i></h2>
          <p>Create groups to suit your style</p>
        </div>
        <div className='carousel-item white main-text-color z-depth-4'>
          <h2><i className="material-icons">person_add</i></h2>
          <p>Add friends to your groups</p>
        </div>
        <div className='carousel-item white main-text-color z-depth-4'>
          <h2><i className="material-icons">mode_edit</i></h2>
          <p>Send messages with fitting priority level</p>
        </div>
        <div className='carousel-item white main-text-color z-depth-4'>
          <h2><i className="material-icons">notifications_active</i></h2>
          <p>Get real-time notifications even when you are not logged in</p>
        </div>
      </div>
    );
  }
}
