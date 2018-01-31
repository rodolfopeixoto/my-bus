import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import * as routes from '../constants/routes';

const PasswordForgetPage = () =>
  <div className="container">
    <h1>Esqueceu a senha? Vamos te ajudar!</h1>
    <PasswordForgetForm />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);  
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) =>{
    const { email } = this.state;

    auth.doPasswordReset(email)
      .then( () => {
        this.setState( () => ({ ...INITIAL_STATE }));
      })
      .catch( error => {
        this.setState(byPropKey('error',error));
      });
      event.preventDefault();
  }
  


  render(){
    
    const{
      email,
      error,
    } = this.state;

    const isInvalid = email === '';

    return(
        <div>
          <h2>Esqueci minha senha</h2>

        <form className="form-control" onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              value={this.state.email}
              type='text'
              placeholder='Email'
              onChange={event => this.setState(byPropKey('email', event.target.value))}
              className="form-control"
            />
          </div>

          <button disabled={isInvalid} type="submit" className="form-control btn btn-primary">Mudar</button>

          {error && <p>{error.message}</p>}
        </form>
        </div>
    );
  }
}

const PasswordForgetLink = () =>
  <p>
    <Link to={routes.PASSWORD_FORGET}>Esqueceu a senha?</Link>
  </p> 

export default PasswordForgetPage;

export {
  PasswordForgetForm,
  PasswordForgetLink,
};