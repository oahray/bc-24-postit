import React, { Component } from 'react';
import { Button } from 'react-materialize';
import GuestHome from '../components/GuestHome.jsx';
import UserHome from './UserHome.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {}
    }
  }

  // setUser(user) {
  //   this.setState({
  //     user,
  //     isLoggedIn: true
  //   });
  //   console.log('state: ', this.state)
  // }

  toggleLoggedInState() {
    this.setState({
      isLoggedIn: !this.state.isLoggedIn
    })
  };

  render() {
    return (
      <div className='center'>
        { this.state.isLoggedIn ? <UserHome user={this.state.user} /> : <GuestHome setUser={(user) => this.setState({user, isLoggedIn: true})}/> } 
        <Button className='raised white teal-text' onClick={() => this.toggleLoggedInState()}>
          toggle State
        </Button>
      </div>
    )
  }
}

export default App;