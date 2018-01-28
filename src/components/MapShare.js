import React, { Component } from 'react';
import * as routes from '../constants/routes';
import { Link } from 'react-router-dom';
import { auth, db } from './../firebase';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import '../stylesheets/Map.css';
import 'font-awesome/css/font-awesome.min.css';
import PersonImage from '../images/person.png';



const INITIAL_STATE = {
    email: '',
    city: 'campos-dos-goytacazes',
    latitude: null,
    longitude: null,
    itinerary: '',
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
        // binding this to event-handler functions
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClicked = this.onMapClicked.bind(this);

    }

    componentWillUpdate(nextProps, nextState) {
        console.log('Update: ', nextState);
    }

    componentDidMount() {

        if (!navigator.geolocation) {
            this.setState({ error: 'Infelizmente o seu navegador que você está utilizando não suporta geolocalização.' })
        } else {
            this.watchId = navigator.geolocation.watchPosition(
                (position) => {
                    console.log('Position Initial', position.coords);
                    this.setState({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        error: null,
                    });
                },
                (error) => this.setState({
                    error: error.message
                }), {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0,
                    distanceFilter: 1
                },
            );

        }



        //     const { match: { params } } = this.props;

        //     this.fetchLocation(true);
        //     db.doCreateShareLocation(email, city, latitude, longitude, params.numeroDaLinha, params.itinerario)
        //         .then(() => {
        //             this.setState(() => ({ ...INITIAL_STATE }));
        //             console.log('Cadastrado ShareLocation');
        //         })
        //         .catch(error => {
        //             this.setState(byPropKey('error', error));
        //         });


    }


    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
    }

    point() {
        alert('Aqui é um ponto de ônibus');
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
            email,
            city,
            latitude,
            longitude,
            numberLine,
            itinerary,
            error
        } = this.state;


        return (
            <Map
                google={this.props.google}
                onReady={this.fetchPlaces}
                className={'map'}
                zoom={16}
                center={{
                    lat: this.state.latitude,
                    lng: this.state.longitude
                }}
                onClick={this.onMapClicked}

            >
                <Marker
                    onClick={this.onMapClicked}
                    name={'Você está aqui <3'}
                    position={{ lat: this.state.latitude, lng: this.state.longitude }}
                    icon={{
                        url: require('../images/person.png')
                    }}
                />


                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                >
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>


            </Map>

        );
    }
}

export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_API_MAP)
})(MapShare);