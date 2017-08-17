import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, Route, Switch } from 'react-router';
import { Button } from 'react-materialize';
import { GuestRoutes, UserRoutes } from '../routes';
import SideNav from './SideNav';
import { verifyAuth } from '../actions';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (window.localStorage.getItem('x-auth')) {
      const token = window.localStorage.getItem('x-auth');
      this.props.verifyAuth(token);
    }
  }

  componentDidMount() {
    $('.carousel').carousel();
    $('.button-collapse').sideNav();
    // the "href" attribute of the modal trigger must specify
    // the modal ID that wants to be triggered
    $('.modal').modal();
    // Initialize material select
    $('select').material_select();
  }

  showState() {
    const myProps = this.props;
    console.log('App state: ', myProps.store.getState())
  }

  render() {
    const sideNav = () => (<SideNav isLoggedIn={this.props.isLoggedIn} groups={this.props.groupList}/>);
    let appRoutes = <GuestRoutes nav={SideNav} />
    if (this.props.isLoggedIn) {
      appRoutes = <UserRoutes nav={SideNav} />
    }
    return (
      <div class='main'>
        { appRoutes }
        <div className='center'> 
          <Button onClick={() => this.showState()}>
            Show State
          </Button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    isLoggedIn: state.isAuthenticated,
    token: state.token
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ verifyAuth }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
