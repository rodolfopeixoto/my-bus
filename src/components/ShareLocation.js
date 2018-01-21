import React, { Component } from 'react';
import * as routes from '../constants/routes';
import { geolocated } from 'react-geolocated';
import { Link } from 'react-router-dom';
import { db } from './../firebase';

const INITIAL_STATE = { 
    email: '',
    city: 'camposDosGoytacazes',
    latitude: null,
    longitude: null,
    numberLine: '',
    itinerary: '',
    error: null
}

const coordenadas = {
    latitude: '',
    longitude: ''
}

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class ShareLocation extends Component {

    constructor(props){
      super(props);
      this.state = {...INITIAL_STATE}
      this.fetchLocation(false);
    }

    componentDidMount(){

     const  { 
            email,
            city,
            latitude,
            longitude,
            numberLine,
            itinerary
        } = this.state;

        const { match: { params } } = this.props;

        console.log("Latidetude: ",latitude);

        db.doCreateShareLocation(email, city, latitude, longitude, params.numeroDaLinha, params.itinerario)
            .then(() => {
                this.setState(() => ({ ...INITIAL_STATE }));
                console.log('Cadastrado ShareLocation');
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });



    }

    fetchLocation(pause){
        let latitudeCoords = null;
        let longitudeCoords = null;
        let id = navigator.geolocation.watchPosition( (res) => {
          const coords = res.coords;
          latitudeCoords = coords.latitude;
          longitudeCoords = coords.longitude;
        },
      (error) => {
          console.warn(error);
      })
      
        this.setState({ latitude: latitudeCoords, longitude: longitudeCoords })
        console.log(latitudeCoords + "Teste");

      if (pause){
          navigator.geolocation.clearWatch(id);
      }

    }

    // shouldComponentUpdate(nextProps) {
    //     const differentLatitude = this.props.coords.latitude !== nextProps.coords.latitude;
    //     const differentLongitude = this.props.coords.longitude !== nextProps.coords.longitude
    //     return differentLatitude || differentLongitude;
    // }

    render() {

        const {
            email,
            city,
            latitude,
            longitude,
            numberLine,
            itinerary,
            error
        } = this.state;


        return !this.props.isGeolocationAvailable
               ? <div className="container">
                   O seu browser infelizmente não suporta Geolocalização. :(
                 </div>
                 : !this.props.isGeolocationEnabled
                 ? <div className="container">Por favor, ative a Geolocalização, pois no momento ela não está habilitada.</div>
                 : this.props.coords
                 ?
                <div className="container">
                  <p>
                    Olá, muito obrigado por ajudar a aumentar essa corrente do bem!
                    Você está ajudando 0 pessoas. Mas não desligue, pois a qualquer momento as pessoas podem
                    acessar. Nós pegamos sua localização de 1 em 1 minuto para que possamos a cada 1 minuto mostrar
                    a localização.
                    <br/>
                    <br />
                    <b>Latitude:</b> { this.props.coords.latitude }
                    <br />
                    <b>Longitude:</b>{ this.props.coords.longitude }
                    <br/>
                    <Link to={routes.SEARCH_BUS}><button className="form-control btn btn-primary">Voltar</button></Link>
                    <Link to={routes.SEARCH_BUS}><button className="form-control btn btn-primary"
                      onClick={ () => this.fetchLocation(true) }
                      >PAUSAR</button></Link>
                  </p>
                </div>
                : <div>Obtenha os dados da localização.</div>; 
    }
}


export default geolocated({
    positionOptions: {
        enableHighAccuracy: true,

    },
    userDecisionTimeout: 10000,
})(ShareLocation);