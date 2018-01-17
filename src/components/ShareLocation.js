import React, { Component } from 'react';
import Header from './Header';
import * as routes from '../constants/routes';
import { geolocated } from 'react-geolocated';

class ShareLocation extends Component {
    render() {
        return !this.props.isGeolocationAvailable
               ? <div>
                   O seu browser infelizmente não suporta Geolocalização. :(
                 </div>
                 : !this.props.isGeolocationEnabled
                 ? <div>Por favor, ative a Geolocalização, pois no momento ela não está habilitada.</div>
                 : this.props.coords
                 ?
                <div className="container">
                  <p>
                    Olá, muito obrigado por ajudar a aumentar essa corrente do bem!
                    Você está ajudando 0 pessoas. Mas não desligue, pois a qualquer momento as pessoas podem
                    acessar. Nós pegamos sua localização de 1 em 1 minuto para que possamos a cada 1 minuto mostrar
                    a localização.
                    <b>Latitude:</b>{ this.props.coords.latitude}
                    <br/>
                    <b>Longitude:</b>{ this.props.coords.longitude}
                    <br/>
                    <b>Altitude:</b>{ this.props.coords.altitude}
                    <br/>
                    <b>Velocidade:</b>{ this.props.coords.speed}
                    <br/>
                  </p>
                </div>
                : <div>Obtenha os dados da localização.</div>; 
    }
}


export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,

    },
    userDecisionTimeout: 5000,
})(ShareLocation);