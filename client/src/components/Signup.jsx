import React, { Component } from 'react';
import axios from 'axios';
import { Modal, Row, Input, Button } from 'react-materialize';
import SigninModal from './Signin.jsx';

export default class SignupModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  signup() {
    const username = this.state.username;
    const email = this.state.email;
    const password = this.state.password;
    const confirmPassword = this.state.confirmPassword;
    // Check password match
    if ( password !== confirmPassword) {
      console.log('Passwords do not match!')
    }
    axios.post('http://localhost:8000/api/user/signup', {
      username,
      email,
      password
    }).then((res) => {
      if (res.data.error) {
        return console.log(res.data.error);
      }
      console.log(res);
      const user = res.data.user;
      const message = res.data.message;
      this.props.setUser(user);
    })
    .catch((err) => console.log(err));
  }

  render() {
    return (
      <Modal
        id='signupModal'
        header='Sign up'
        fixedFooter
        trigger={
          <Button className={this.props.trigger} waves='light'>Sign up</Button>
        }>
        <Row>
          <Input s={12} label="Username" required onChange={event => this.setState({ username: event.target.value})}/>
          <Input type="email" label="Email" s={12} validate required onChange={event => this.setState({ email: event.target.value})}/>
          <Input type="password" label="Password" s={12} required onChange={event => this.setState({ password: event.target.value})}/>
          <Input type="password" label="Confirm password" s={12} required onChange={event => this.setState({ confirmPassword: event.target.value})}/>
          <div className='center'>
            <Button className='white teal-text' waves='light' onClick={() => this.signup()}>Submit</Button>
          </div>
          <div className='center'>
            <p> Have an account? </p>
          </div>
        </Row>
      </Modal>
    )
  }
}
