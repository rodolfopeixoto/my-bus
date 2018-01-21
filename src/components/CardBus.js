import React, { Component } from 'react';
import * as routes from './../constants/routes';
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../stylesheets/Card.css';

const CardBus = ({ lines }) =>
   {
    <Card body inverse color="primary">
        <CardTitle>#216</CardTitle>
        <CardText>
            UENF - SHOPPING ESTRADA
            <br/>
            (Temos a rota)
        </CardText>
        <Link to={routes.LINE}>
            <Button className="form-control">VISUALIZAR</Button>
        </Link>
        <Link to={routes.SHARE_LOCATION}>
            <Button className="form-control">COMPARTILHAR</Button>
        </Link>
      </Card>
    }

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(CardBus);