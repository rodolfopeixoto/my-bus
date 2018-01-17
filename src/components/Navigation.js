import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import SignOutButton from './SignOut';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';

const Navigation = (props, { authUser }) =>
  <div>
    {
      authUser ? <NavigationAuth /> : <NavigationNonAuth />
    }
  </div>


Navigation.contextTypes = {
  authUser: PropTypes.object,
};

class NavigationAuth extends React.Component {

  constructor(props){
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { isOpen: false }
  }

  toggle(){
    this.setState({ isOpen: !this.state.isOpen });
  }

  render(){
    return(
      <Navbar expand="md" dark className="navbar">
        <NavbarBrand href="/">Meu Ônibus</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link to={routes.HOME} className="nav-link">Home</Link>
            </NavItem>
            <NavItem>
              <Link to={routes.SEARCH_BUS} className="nav-link">Linhas</Link>
            </NavItem>
            <NavItem>
              <Link to={routes.SHARE_LOCATION} className="nav-link">Compartilhar</Link>
            </NavItem>
            <NavItem>
              <Link to={routes.ACCOUNT} className="nav-link">Conta</Link>
            </NavItem>
            <NavItem>
              <SignOutButton />
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }

}
class NavigationNonAuth extends React.Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { isOpen: false }
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }
  render(){
    return(
        <Navbar expand="md" dark className="navbar">
            <NavbarBrand href="/">Meu Ônibus</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Link to={routes.LANDING} className="nav-link">Home</Link>
                </NavItem>
                <NavItem>
                  <Link to={routes.SIGN_IN} className="nav-link">Acessar</Link>
                </NavItem>
                <NavItem>
                <Link to={routes.SIGN_UP} className="nav-link">Cadastre-se</Link>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>

      
    );
  }
}
export default Navigation;