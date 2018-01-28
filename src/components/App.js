import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import LandingPage from './Landing';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import HomePage from './Home';
import AccountPage from './Account';
import LineLocation from './LineLocation';
import Lines from './Lines';
import ShareLocation from './ShareLocation';
import * as routes from '../constants/routes';
import withAuthentication from './withAuthentication';
import CreateLine from './CreateLine';

class App extends Component{

  render(){
    return(
      <Router>
        <div>
          

          <Route exact path={routes.LANDING} component={() => <LandingPage />} />
          <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
          <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
          <Route exact path={routes.HOME} component={() => <HomePage />} />
          <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
          <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
          <Route exact path={routes.LINE} component={() => <LineLocation />} />
          <Route exact path={routes.SEARCH_BUS} component={() => <Lines />} />
          
          <Route path={routes.SHARE_LOCATION} component={ShareLocation} />

          <Route exact path={routes.CreateLine} component={() => <CreateLine />} />
        </div>
      </Router>

    );
  }
}
 
export default withAuthentication(App);