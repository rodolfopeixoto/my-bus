import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import { auth } from '../firebase';

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
      <div>
        <a href="javascript:void(0)" className="float" id="menu-share">
          <i className="fa fa-share my-float"></i>
        </a>
        <ul className="fab">

          <li>
            <a onClick={auth.doSignOut}>
              <i className="fa fa-sign-out my-float"></i>
            </a>
            <div className="label-container">
              <div className="label-text">Sair</div>
            </div>
          </li>

          <li>
            <a href="https://www.facebook.com/meuonibusBR" rel='noopener noreferrer' target="_blank">
              <i className="fa fa-facebook my-float"></i>
            </a>
            <div className="label-container">
              <div className="label-text">Facebook</div>
            </div>
          </li>

          <li>
            <Link to={routes.ACCOUNT}>
              <i className="fa fa-user my-float"></i>
            </Link>
            <div className="label-container">
              <div className="label-text">Conta</div>
              <i className="fa fa-play label-arrow"></i>
            </div>
          </li>

          <li>
            <Link to={routes.SEARCH_BUS}>
              <i className="fa fa-bus my-float"></i>
            </Link>
            <div className="label-container">
              <div className="label-text">Linhas</div>
              <i className="fa fa-play label-arrow"></i>
            </div>
          </li>

          <li>
            <Link to={routes.HOME}>
              <i className="fa fa-commenting-o my-float"></i>
            </Link>
            <div className="label-container">
              <div className="label-text">Comentários</div>
              <i className="fa fa-play label-arrow"></i>
            </div>
          </li>
        </ul>
        </div>

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
               <div>
                  <a href="javascript:void(0)" className="float" id="menu-share">
                      <i className="fa fa-share my-float"></i>
                  </a>
                  <ul className="fab">

                      <li>
                          <a href="https://www.facebook.com/meuonibusBR" rel='noopener noreferrer' target="_blank">
                              <i className="fa fa-facebook my-float"></i>
                          </a>
                          <div className="label-container">
                              <div className="label-text">Facebook</div>
                          </div>
                      </li>
                      <li>
                          <Link to={routes.SIGN_IN}>
                              <i className="fa fa-sign-in my-float"></i>
                          </Link>
                          <div className="label-container">
                              <div className="label-text">Acessar</div>
                              <i className="fa fa-play label-arrow"></i>
                          </div>
                      </li>
                      <li>
                          <Link to={routes.SIGN_UP}>
                              <i className="fa fa-user-plus my-float"></i>
                          </Link>
                          <div className="label-container">
                              <div className="label-text">Cadastrar</div>
                              <i className="fa fa-play label-arrow"></i>
                          </div>
                      </li>
                  </ul>
               </div>
      
    );
  }
}
export default Navigation;