import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, Route, Switch } from 'react-router';
import { Button } from 'react-materialize';
import Routes from '../routes';
import SideNav from './SideNav';

class App extends Component {
  constructor(props) {
    super(props);
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
    return (
      <div class='main'>
        {/* <Route component={SideNav} /> */}
        <Routes nav={SideNav}/>
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

export default connect(mapStateToProps)(App);
