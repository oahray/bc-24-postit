import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, Route, Switch, Redirect } from 'react-router-dom';
import { Button } from 'react-materialize';
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
  }

  showState() {
    const myProps = this.props;
    console.log('App props: ', myProps);
    console.log('App state: ', myProps.store.getState());
  }

  render() {
    const stateButton = (
      <div className='center'> 
        <Button onClick={() => this.showState()}>
          Show State
        </Button>
      </div>
    );

    // if (this.props.verifyAuthFailed && window.location.pathname !== '/') {
    //   return <div>
    //     <h5>Unverified user at {}</h5>
    //     {stateButton}
    //   </div>;
    //   // return <Redirect to='/' />
    // } else 
    if (this.props.userLoading) {
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
      )
    }
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ verifyAuth }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
