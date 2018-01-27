import React, { Component } from 'react';
import * as routes from './../constants/routes';
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../stylesheets/Card.css';
import withAuthorization from './withAuthorization';
import Navigation from './Navigation';
import { db } from '../firebase';

class Lines extends Component {

    constructor(props){
      super(props);
      this.state = {
          lines: null
      };
    }

    componentDidMount(){
        db.onceGetLines()
          .then( snapshot =>
          this.setState( () => ({ lines: snapshot.val() }))
        )
        .catch( (error) => {
            console.log('error', error);
        });
    }
    
    render() {
        const { lines } = this.state;

        
        return (
            <div>
                <Navigation />
                <div className="container">
                    {!!lines && <CardBus lines={lines} /> }
                </div> 
            </div>     
        );
    }
}


const CardBus = ({ lines }) => 
    Object.keys(lines).map( key =>
        <Card body inverse color="primary" key={key}>
            <CardTitle>Linha: {lines[key].itinerario}</CardTitle>
            <CardText>
                Direção: {lines[key].direcao}
                <br />
                Pontos: <br/> {lines[key].pontos}
            </CardText>
            <Link to={routes.LINE}>
                <Button className="form-control">VISUALIZAR</Button>
            </Link>
            <Link to={`/compartilhar-localizacao/${lines[key].cidade}/${lines[key].paramsItinerario}`}>
                <Button className="form-control">COMPARTILHAR</Button>
            </Link>
        </Card>

    )

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Lines);