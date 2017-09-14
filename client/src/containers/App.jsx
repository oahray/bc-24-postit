import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, } from 'react-router-dom';
import { Button } from 'react-materialize';
import toastr from 'toastr';
import { GuestRoutes, UserRoutes } from '../routes';
import SideNav from './SideNav';
import { verifyAuth } from '../actions';
import Preloader from '../components/Preloader';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (window.localStorage && window.localStorage.getItem('x-auth')) {
      const token = window.localStorage.getItem('x-auth');
      this.props.verifyAuth(token);
    }
  }

  componentDidMount() {
    $('.modal-trigger').modal();
    const socket = io();

    socket.on('Added to group', ({ user, group, addedBy }) => {
      console.log({ user, group });
      if (user.id === this.props.user.id) {
        toastr.info(`You have just been added to ${group.name} by ${addedBy}`);
      }
    });
  }

  showState() {
    console.log('App props: ', this.props);
    console.log('App state: ', this.props.store.getState());
  }

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
    } else {
      const sideNav = () => (<SideNav isLoggedIn={this.props.isLoggedIn} groups={this.props.groupList}/>);

      let appRoutes;

      if (this.props.isLoggedIn) {
        appRoutes = <UserRoutes nav={SideNav} />
      } else {
        appRoutes = <GuestRoutes nav={SideNav} />
      }

      return (
        <div class='main'>
          { appRoutes }
          { stateButton }
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    verifyAuthLoading: state.verifyAuthLoading,
    isLoggedIn: state.isAuthenticated,
    verifyAuthFailed: state.verifyAuthFailed,
    token: state.token
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ verifyAuth }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
