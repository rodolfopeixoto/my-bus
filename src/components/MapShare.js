import React, { Component } from 'react';
import * as routes from '../constants/routes';
import { Link } from 'react-router-dom';
import { auth, db } from './../firebase';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import '../stylesheets/Map.css';
import 'font-awesome/css/font-awesome.min.css';



const INITIAL_STATE = {
    email: '',
    cidade: 'campos-dos-goytacazes',
    latitude: null,
    longitude: null,
    itinerario: '',
    timestamp: null,
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    error: null
}

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});


class MapShare extends Component {

    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE }
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClicked = this.onMapClicked.bind(this);
        this.createShare = this.createShare.bind(this);
        this.geoLocation = this.geoLocation.bind(this);

    }

    componentWillMount() {

        let positionItinerario = window.location.pathname.split('/')[3]
        this.geoLocation();
        this.setState({ email: auth.getUser().email, itinerario: positionItinerario  })
    }

    geoLocation() {
        if (!navigator.geolocation) {
            this.setState({ error: 'Infelizmente o seu navegador que você está utilizando não suporta geolocalização.' })
        } else {
            this.watchId = navigator.geolocation.watchPosition(
                (position) => {
                  this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude });
                },
                (error) => this.setState({
                    error: error.message
                }), {
                    enableHighAccuracy: true
                },
            );

        }
    }



    componentWillUpdate(nextProps, nextState) {

        const {
            email,
            cidade,
            latitude,
            longitude,
            itinerario,
        } = nextState;
        if (nextState.latitude != null && nextState.longitude != null){

            if (nextState.latitude !== this.state.latitude || nextState.longitude !== this.state.longitude) {
               
                setTimeout(() => {

                    let positionTimestamp = new Date().getTime();
                    this.setState({ email, cidade, latitude, longitude, itinerario });
                    this.createShare(email, cidade, latitude, longitude, itinerario, positionTimestamp);
                    
                }, 30000);
            }

        }
    }


    createShare(email, cidade, latitude, longitude, itinerario, timestamp) {
        db.doCreateShareLocation(email, cidade, latitude, longitude, itinerario, timestamp)
            .then((success) => {
                this.setState({ email, cidade, latitude, longitude, itinerario, timestamp });
            })
            .catch(error => {
                this.setState((byPropKey('error', error)))
            })
    }


    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
    }

    onMarkerClick(props, marker, e) {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }


    onMapClicked(props) {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    }

    render() {
        const {
            latitude,
            longitude,
            showingInfoWindow,
            activeMarker,
            selectedPlace
        } = this.state;

        const { google } = this.props;

        return (
            <Map
                google={google}
                className={'map'}
                zoom={16}
                center={{
                    lat: latitude,
                    lng: longitude
                }}
                onClick={this.onMapClicked}

            >
                <Marker
                    onClick={this.onMapClicked}
                    name={'Você está aqui <3'}
                    position={{ lat: latitude, lng: longitude }}
                    icon={{
                        url: require('../images/person.png')
                    }}
                />


                <InfoWindow
                    marker={activeMarker}
                    visible={showingInfoWindow}
                >
                    <div>
                        <h1>{selectedPlace.name}</h1>
                    </div>
                </InfoWindow>


                <div className="mensagem-map-share">
                    Por favor, não saia do aplicativo, pois caso tente minimzar, perderemos sua localização. :(
               </div>


                    <a href="javascript:void(0)" className="float" id="menu-share">
                        <i className="fa fa-share my-float"></i>
                    </a>

                <ul className="fab">

                    <li>
                        <a onClick={auth.doSignOut}>
                            <i className="fa fa-sign-out my-float"></i>
                        </a>
                        <div className="label-container">
                            <div className="label-text">Sair</div>
                        </div>
                    </li>

                    <li>
                        <a href="https://www.facebook.com/meuonibusBR" rel="noopener noreferrer" target="_blank">
                            <i className="fa fa-facebook my-float"></i>
                        </a>
                        <div className="label-container">
                            <div className="label-text">Facebook</div>
                        </div>
                    </li>
                    <li>
                        <Link to={routes.SEARCH_BUS}>
                            <i className="fa fa-undo my-float"></i>
                        </Link>
                        <div className="label-container">
                            <div className="label-text">Voltar</div>
                            <i className="fa fa-play label-arrow"></i>
                        </div>
                    </li>
                    <li>
                        <a href="">
                            <i className="fa fa-map-marker my-float"></i>
                        </a>
                        <div className="label-container">
                            <div className="label-text">Ponto de Ônibus</div>
                            <i className="fa fa-play label-arrow"></i>
                        </div>
                    </li>
                </ul>

            </Map>

        );
    }
}

export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_API_MAP)
})(MapShare);