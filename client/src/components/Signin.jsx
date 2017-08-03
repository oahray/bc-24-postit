import React, { Component } from 'react';
import axios from 'axios';
import { Modal, Row, Input, Button } from 'react-materialize';

export default class SigninModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  signin() {
    const username= this.state.username;
    const password= this.state.password;
    // Make signin call to POSTIT API
    axios.post('http://localhost:8000/api/user/signin', {
      username,
      password
    })
    .then((res) => {
      console.log(res)
      if (res.data.error) {
        console.log(res.data.error);
      }
      const user = res.data.user;
      this.props.setUser(user);
    })
    .catch((err) => console.log(err));
  }

  render() {
    return (
      <Modal
        id='signinModal'
        header='Sign in'
        fixedFooter
        trigger={
          <Button className={this.props.trigger} waves='teal'>Sign in</Button>
        }>
        <Row>
          <Input s={12} label="Username" onChange={event => this.setState({ username: event.target.value})} />
          <Input type="password" label="Password" s={12} onChange={event => this.setState({ password: event.target.value})} />
          <div className='center'>
            <Button className='white teal-text' waves='teal' onClick={() => this.signin()}>Submit</Button>
          </div>
          <div className='center'>
            <p> New to Postit? </p>
          </div>
        </Row>
      </Modal>
    )
  }
}
