import React, { Component} from  'react';
import { Navbar, NavItem, Icon, Carousel, Button } from 'react-materialize';
import GuestCarousel from './GuestCarousel.jsx';
import SignupModal from './Signup.jsx';
import SigninModal from './Signin.jsx';
import '../styles/App.scss'

class GuestHome extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const normalTrigger = 'white teal-text';
    const flatTrigger = 'white btn-flat teal-text'
    return (
      < div className='center'>
        <Navbar className='teal lighten-1' brand='Postit' right fixed>
          <NavItem 
          href='#about'><Icon>search</Icon></NavItem>
          <NavItem href='#'><Icon>view_module</Icon></NavItem>
          <NavItem href='#'><Icon>refresh</Icon></NavItem>
          <NavItem href='#'><Icon>more_vert</Icon></NavItem>
        </Navbar>
        <GuestCarousel />
        <div>
          <p> To learn more or to get started,</p>
          <SignupModal setUser={this.props.setUser} flatTrigger= {flatTrigger} trigger={normalTrigger} /> 
          or 
          <SigninModal setUser={this.props.setUser} flatTrigger= {flatTrigger} trigger={normalTrigger} />
        </div>
      </div>
    )
  }
};

export default GuestHome;