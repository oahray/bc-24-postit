import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import GuestHome from '../components/GuestHome';
import Signin from '../containers/SigninForm';
import Signup from '../containers/SignupForm';
import UserHome from '../containers/UserHome';
import Group from '../containers/Group';
import SearchResults from '../containers/SearchResults';
import NewGroup from '../containers/NewGroup';
import EditProfile from '../containers/EditProfile';
import ForgotPassword from '../containers/ForgotPassword';
import ResetPassword from '../containers/ResetPassword';
import NotFound from '../components/NotFound';

const routeHandler = (props, component) => (
  <BrowserRouter>
    <div className='main'>
      <Route component={props.nav} />
      { component }
    </div>
  </BrowserRouter>
);

export const GuestRoutes = (props) => {
  const unauthRoutes = (
    <div>
      <Switch>
        <Route exact path="/" component={GuestHome} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/forgotpassword" component={ForgotPassword} />
        <Route exact path="/resetpassword" component={ResetPassword} />
        <Route exact path="*" component={NotFound} />
      </Switch>
    </div>
  );
  return routeHandler(props, unauthRoutes);
};

export const UserRoutes = (props) => {
  const authRoutes = (
    <div className='main-container'>
      <Switch>
        <Route exact path='/' component={UserHome} />
        <Route exact path='/groups/new' component={NewGroup} />
        <Route exact path='/groups/:groupid/messages'
        component={Group} />
        <Route exact path='/groups/:groupid/addusers'
        component={SearchResults}/>
        <Route exact path="/edit" component={EditProfile} />
        <Route exact path="*" component={NotFound} />
      </Switch>
    </div>
  );
  return routeHandler(props, authRoutes);
};
