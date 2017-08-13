import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import GuestHome from '../components/GuestHome';
import Signin from '../containers/SigninForm';
import Signup from '../containers/SignupForm';
import UserHome from '../containers/UserHome';
import Group from '../containers/Group';
import ForgotPassword from '../components/ForgotPassword';
import NotFound from '../components/NotFound';

export default function Routes(props) {
  return (
    <BrowserRouter>
      <div>
        <Route component={props.nav} />
        <div className='main-container row'>
          <Switch>
            <Route exact path="/" component={GuestHome} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/forgotpassword" component={ForgotPassword} />
            <Route exact path='/dashboard' component={UserHome} />
            <Route path='/groups/:groupid/messages' component={Group} />
            <Route path="/*" component={NotFound} />
          </Switch>
        </div>
      </div>
  </BrowserRouter> 
  )
};