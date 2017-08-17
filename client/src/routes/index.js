import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import GuestHome from '../components/GuestHome';
import Signin from '../containers/SigninForm';
import Signup from '../containers/SignupForm';
import UserHome from '../containers/UserHome';
import Group from '../containers/Group';
import ForgotPassword from '../components/ForgotPassword';
import NotFound from '../components/NotFound';

const unauthRoutes = (
  <Switch>
    <Route exact path="/signin" component={Signin} />
    <Route exact path="/signup" component={Signup} />
    <Route exact path="/forgotpassword" component={ForgotPassword} />
    <Route path="/*" component={GuestHome} />
  </Switch>
);
const authRoutes = (
  <Switch>
    <Route path='/groups/:groupid/messages' component={Group} />
    <Route path="/*" component={UserHome} />
  </Switch>
);

const routeHandler = (props, component) => {
  return (
    <BrowserRouter>
      <div className='main'>
        <Route component={props.nav} />
        <div className='main-container'>
          { component }
        </div>
      </div>
  </BrowserRouter> 
  )
};

export function GuestRoutes(props) {
  return routeHandler(props, unauthRoutes);
}

export function UserRoutes(props) {
  return routeHandler(props, authRoutes);
}
