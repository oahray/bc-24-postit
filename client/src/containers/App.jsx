import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-materialize';
import toastr from 'toastr';
import { GuestRoutes, UserRoutes } from '../routes';
import SideNav from './SideNav';
import { verifyAuth } from '../actions';
import Preloader from '../components/Preloader';

/**
 * @class
 */
class App extends Component {
  /**
   * @returns {undefined}
   */
  componentWillMount() {
    if (window.localStorage && window.localStorage.getItem('x-auth')) {
      const token = window.localStorage.getItem('x-auth');
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
    const stateButton = (
      <div className='center'>
        <Button onClick={() => this.showState()}>
          Show State
        </Button>
      </div>
    );

    if (this.props.verifyAuthLoading) {
      return (<Preloader message='Preparing your space...'/>);
    }

    let appRoutes;

    if (this.props.isLoggedIn) {
      appRoutes = (<UserRoutes nav={SideNav} />);
    } else {
      appRoutes = (<GuestRoutes nav={SideNav} />);
    }

    return (
      <div class='main'>
        { appRoutes }
        {/* { stateButton } */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  verifyAuthLoading: state.verifyAuthLoading,
  isLoggedIn: state.isAuthenticated,
  verifyAuthFailed: state.verifyAuthFailed,
  token: state.token
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ verifyAuth }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
