import React, { Component } from 'react';
import { 
  withRouter
  } from 'react-router-dom';
import { db } from './../firebase';
import Navigation from './Navigation';

const CreateLinePage = ({ history }) =>
  <div>
      <Navigation />
      <div className="container">
        <h1>Cadastrar Linha</h1>
        <CreateLineForm  />
      </div>
    </div>

const INITIAL_STATE = {
  nomeDaEmpresa: '',
  direcao: '',
  itinerario: '',
  cidade: 'campos-dos-goytacazes',
  email: '',
  paramsItinerario: '',
  pontos: '',
  error: null
}

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class CreateLineForm extends Component {
  constructor(props){
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {

    const {
      nomeDaEmpresa,
      direcao,
      itinerario,
      cidade,
      paramsItinerario,
      pontos,
      transporte
    } = this.state;

    const {
    } = this.props;



    event.preventDefault();

    db.doCreateLine(nomeDaEmpresa, direcao, itinerario, cidade, paramsItinerario, pontos, transporte)
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
      nomeDaEmpresa,
      direcao,
      itinerario,
      paramsItinerario,
      pontos,
      transporte,
      error
    } = this.state;

    const isInvalid =
      nomeDaEmpresa === '' ||
      direcao === '' ||
      itinerario === '' ||
      paramsItinerario === '' ||
      transporte === ''


    return(
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
        <input 
          value={nomeDaEmpresa}
            onChange={event => this.setState(byPropKey('nomeDaEmpresa', event.target.value.toLowerCase())) }
          type="text"
          placeholder="Empresa"
          className="form-control"
        />
        </div>

        <div className="form-group">
          <input
            value={direcao}
            onChange={event => this.setState(byPropKey('direcao', event.target.value.toLowerCase()))}
            type="text"
            placeholder="Direção"
            className="form-control"
          />
        </div>

        <div className="form-group">
        <input 
          value={itinerario}
            onChange={event => this.setState(byPropKey('itinerario', event.target.value.toLowerCase())) }
          type="text"
          placeholder="Itinerário"
          className="form-control"
        />
        </div>

        <div className="form-group">
          <input
            value={paramsItinerario}
            onChange={event => this.setState(byPropKey('paramsItinerario', event.target.value.toLowerCase()))}
            type="text"
            placeholder="Parametro Itinerário"
            className="form-control"
          />
        </div>

        <div className="form-group">
        <input 
          value={pontos}
          onChange={ event => this.setState(byPropKey('pontos', event.target.value.toLowerCase())) }
          type="text"
          placeholder="Pontos"
          className="form-control"
        />
        </div>

        <div className="form-group">
            <select
              className="form-control"
              onChange={event => this.setState(byPropKey('transporte', event.target.value.toLowerCase()))}
              >
                <option value="onibus">Ônibus</option>
                <option value="van">Van</option>
            </select>
        </div>
        <button disabled={isInvalid} type="submit" className="btn btn-primary form-control">
          Cadastrar
        </button>
        { error && <p>{ error.message }</p>}
      </form>

    );
  }

}

export default withRouter(CreateLinePage);

export {
  CreateLineForm,
}