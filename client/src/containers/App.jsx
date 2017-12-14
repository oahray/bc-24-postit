import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';

import RouteHandler from '../routes';
import { verifyAuth } from '../actions';
import Preloader from '../components/Preloader';

/**
 * @class
 */
export class App extends Component {
  /**
   * @returns {undefined}
   */
  componentWillMount() {
    if (localStorage && localStorage.getItem('x-auth')) {
      const token = localStorage.getItem('x-auth');
      this.props.verifyAuth(token);
    }
  }

  /**
   * @returns {undefined}
   */
  componentDidMount() {
    setTimeout(() => {
      $('.modal').modal();
    }, 800);

    const socket = io();

    socket.on('Added to group', ({ user, group, addedBy }) => {
      if (user.id === this.props.user.id) {
        toastr.info(`You have just been added to ${group.name} by ${addedBy}`);
      }
    });

    socket.on('Removed from group', ({ user, group, removedBy }) => {
      if (user.id === this.props.user.id) {
        toastr.info(`You have just been removed from ${
          group.name} by ${removedBy}`);
      }
    });
  }

  // showState() {
  //   console.log('App props: ', this.props);
  //   console.log('App state: ', this.props.store.getState());
  // }

  /**
   * @returns {undefined}
   */
  render() {
    // const stateButton = (
    //   <div className='center'>
    //     <a className="btn white main-color"
    //     onClick={() => this.showState()}>
    //       Show State
    //     </a>
    //   </div>
    // );

    if (this.props.verifyAuthLoading) {
      return (<Preloader message='Preparing your space...'/>);
    }

    const appRoutes = <RouteHandler isLoggedIn={this.props.isLoggedIn} />;

    return (
      <div class='main'>
        { appRoutes }
        {/* { stateButton } */}
        {/* <Footer /> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  verifyAuthLoading: state.verifyAuthLoading,
  isLoggedIn: state.isAuthenticated
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ verifyAuth }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
