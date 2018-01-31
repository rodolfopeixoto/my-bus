import React, { Component } from 'react';
import { auth } from '../firebase';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { passwordOne } = this.state;

    auth.doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '';

    return (
      <div>
        <h2>Desejo resetar a senha!</h2>
        <form className="form-control" onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              value={passwordOne}
              onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
              type="password"
              placeholder="Nova Senha"
              className="form-control"
            />
          </div>
          <input
            value={passwordTwo}
            onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
            type="password"
            placeholder="Confirme a Nova Senha"
            className="form-control"
          />
          <button disabled={isInvalid} type="submit" className="form-control btn btn-primary">
            Resetar minha Senha
          </button>

          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}

export default PasswordChangeForm;