import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { SignUpLink } from './SignUp';
import { PasswordForgetLink } from './PasswordForget';
import { auth } from '../firebase';
import * as routes from '../constants/routes';
import Navigation from './Navigation';

const SignInPage = ({ history }) =>
  <div>
    <Navigation />
    <div className="container">
      <h1>Acessar</h1>
      <SignInForm history={history} />
      <PasswordForgetLink />
      <SignUpLink />
    </div>
  </div>


const byPropKey = (propertyName, value) => () => ({
 [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props){
    super(props);
    this.state = { ...INITIAL_STATE }
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then( () => {
        this.setState( () => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch( error => {
        this.setState(byPropKey('error', error));
      });
      event.preventDefault();

  }

  messagePtBR(message){
    let message_ptBR = ""
    switch (message) {
      case 'There is no user record corresponding to this identifier. The user may have been deleted.':
        message_ptBR = 'Não há registro de usuário correspondente a este identificador. O usuário pode ter sido excluído.';
        break;
      case 'The email address is badly formatted.':
        message_ptBR = 'O endereço de e-mail está mal formatado.';
        break;
      case 'The password is invalid or the user does not have a password.':
        message_ptBR = 'A senha é inválida ou o usuário não possui uma senha.';
        break;
      default:
        message_ptBR = 'Por favor, verifique se as informações estã ocorretas.';

        return message_ptBR;
    }
  }

  render(){
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid = 
      password === '' ||
      email === '';

      return(

            <form onSubmit={this.onSubmit} >
              <div className="form-group">
                <input 
                    value={email}
                    onChange={ event => this.setState(byPropKey('email', event.target.value) )}
                    type="text"
                    placeholder="Email"
                    className="form-control"
              />
              </div>
              <div className="form-group">
                  <input 
                    value={password}
                    onChange={ event => this.setState(byPropKey('password', event.target.value)) }
                    type="password"
                    placeholder="Senha"
                    className="form-control"
                  />
                </div>

              <button disabled={isInvalid} type="submit" className="btn btn-primary form-control">Acessar</button>

              { error && <p>{this.messagePtBR(error.message)}</p> }

            </form>
      );
  }
}

export default withRouter(SignInPage);
export {
  SignInForm,
};