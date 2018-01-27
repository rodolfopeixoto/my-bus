import React, { Component } from 'react';
import { 
  Link,
  withRouter
  } from 'react-router-dom';
import { auth, db } from './../firebase';
import * as routes from './../constants/routes';
import Navigation from './Navigation';


const SignUpPage = ({ history }) =>

  <div>
    <Navigation />
    <div className="container">
      <h1>Cadastrar</h1>
      <SignUpForm history={history} />
    </div>
  </div>

const INITIAL_STATE = {
  nome: '',
  sobrenome: '',
  cpf: '',
  dataDeNascimento: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null
}

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignUpForm extends Component {
  constructor(props){
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {

    const {
      nome,
      sobrenome,
      email,
      cpf,
      passwordOne,
      passwordTwo,
      dataDeNascimento
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then( authUser => {
        db.doCreateUser(authUser.uid, nome, sobrenome, email, cpf, dataDeNascimento)
            .then( () => {
              this.setState(() => ({ ...INITIAL_STATE }));
              history.push(routes.HOME);
            });
      })
      .catch( error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();

  }

  render(){

    const {
      nome,
      email,
      passwordOne,
      passwordTwo,
      sobrenome,
      dataDeNascimento,
      cpf,
      error,
    } = this.state;

    const isInvalid = 
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      nome === '' || 
      sobrenome === '' || 
      dataDeNascimento === ''
      cpf === '';
    return(
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
          <input 
            value={nome}
            onChange={ event => this.setState(byPropKey('nome', event.target.value)) }
            type="text"
            placeholder="Nome"
            className="form-control"
          />
          </div>

          <div className="form-group">
            <input
              value={sobrenome}
              onChange={event => this.setState(byPropKey('sobrenome', event.target.value))}
              type="text"
              placeholder="Sobrenome"
              className="form-control"
            />
          </div>

          <div className="form-group">
          <input 
            value={email}
            onChange={ event => this.setState(byPropKey('email', event.target.value)) }
            type="text"
            placeholder="Email"
            className="form-control"
          />
          </div>
          <div className="form-group">
          <input 
            value={passwordOne}
            onChange={ event => this.setState(byPropKey('passwordOne', event.target.value)) }
            type="password"
            placeholder="Senha"
            className="form-control"
          />
          </div>
          <div className="form-group">
          <input 
            value={passwordTwo}
            onChange={ event => this.setState(byPropKey('passwordTwo', event.target.value)) }
            type="password"
            placeholder="Confirme a senha"
            className="form-control"
          />
          </div>
          <div className="form-group">
          <input 
            value={cpf}
            onChange={ event => this.setState(byPropKey('cpf', event.target.value)) }
            type="text"
            placeholder="CPF"
            className="form-control"
          />
          </div>
          <div className="form-group">
          <input 
            value={dataDeNascimento}
            onChange={ event => this.setState(byPropKey('dataDeNascimento', event.target.value)) }
            type="date"
            className="form-control"
          />
          </div>
          <button disabled={isInvalid} type="submit" className="btn btn-primary form-control">
            Cadastrar
          </button>
          { error && <p>{ error.message }</p>}
        </form>
    );
  }

}

const SignUpLink = () =>
  <p>
    Você não tem uma conta? :( Vamos fazer uma! :D
    {' '}
    <Link to={routes.SIGN_UP}>CADASTRE-SE!</Link>
  </p>

export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
}