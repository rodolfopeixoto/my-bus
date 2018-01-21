import React, { Component } from 'react';
import { 
  Link,
  withRouter
  } from 'react-router-dom';
import { auth, db } from './../firebase';
import * as routes from './../constants/routes';

const TestPage = ({ history }) =>
  <div className="container">
    <h1>Test</h1>
    <TestForm history={history} />
  </div>

const INITIAL_STATE = {
  business: '',
  numberLine: '',
  itinerary: '',
  timestamp: Date.now(),
  email: '',
  updated_at: Date.now(),
  city: 'camposDosGoytacazes',
  error: null
}

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class TestForm extends Component {
  constructor(props){
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {

    const {
      business,
      numberLine,
      itinerary,
      timestamp,
      email,
      updated_at,
      city
    } = this.state;

    const {
      history,
    } = this.props;



    event.preventDefault();

    db.doCreateLine(business, numberLine, itinerary, timestamp, email, updated_at, city)
      .then( () => {
        this.setState( () =>( {...INITIAL_STATE } ));
        console.log('Criado com sucesso.');
      })
      .catch( error => {
        this.setState(byPropKey('error', error));
      });

  }

  render(){

    const {
      business,
      numberLine,
      itinerary,
      timestamp,
      email,
      updated_at,
      city,
      error,
    } = this.state;

    const isInvalid =
      business === '' ||
      numberLine === '' ||
      itinerary === '' || 
      email === ''


    return(
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
        <input 
          value={business}
          onChange={ event => this.setState(byPropKey('business', event.target.value)) }
          type="text"
          placeholder="Negócios"
          className="form-control"
        />
        </div>

        <div className="form-group">
          <input
            value={numberLine}
            onChange={event => this.setState(byPropKey('numberLine', event.target.value))}
            type="text"
            placeholder="Número da Linha"
            className="form-control"
          />
        </div>

        <div className="form-group">
        <input 
          value={itinerary}
          onChange={ event => this.setState(byPropKey('itinerary', event.target.value)) }
          type="text"
          placeholder="Itinerário"
          className="form-control"
        />
        </div>

        <div className="form-group">
        <input 
          value={email}
          onChange={ event => this.setState(byPropKey('email', event.target.value)) }
          type="email"
          placeholder="Email"
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

export default withRouter(TestPage);

export {
  TestForm,
}