import React, { Component } from 'react';
import * as routes from './../constants/routes';
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../stylesheets/Card.css';
import withAuthorization from './withAuthorization';

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
            <div className="container">
                {!!lines && <CardBus lines={lines} /> }
            </div>      
        );
    }
}


const CardBus = ({ lines }) => 
    Object.keys(lines).map( key =>
        <Card body inverse color="primary" key={key}>
            <CardTitle>#{lines[key].numberLine}</CardTitle>
            <CardText>
                {lines[key].itinerary}
                <br />
                (Temos a rota)
            </CardText>
            <Link to={routes.LINE}>
                <Button className="form-control">VISUALIZAR</Button>
            </Link>
            <Link to={`/compartilhar-localizacao/${lines[key].numberLine}/${lines[key].itinerary}`}>
                <Button className="form-control">COMPARTILHAR</Button>
            </Link>
        </Card>

    )

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Lines);