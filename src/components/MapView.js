import React, { Component } from 'react';
import * as routes from '../constants/routes';
import { Link } from 'react-router-dom';
import { auth, db } from './../firebase';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import '../stylesheets/Map.css';
import 'font-awesome/css/font-awesome.min.css';



const INITIAL_STATE = {
    emaiUserBus: '',
    emailCurrentUser: '',
    cidade: 'campos-dos-goytacazes',
    latitudeBus: null,
    longitudeBus: null,
    latUser: null,
    lngUser: null,
    itinerario: '',
    error: null,
    key: null,
    bus: null,
    busLocation: null
}

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});


class MapView extends Component {

    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE }
        this.geoLocation = this.geoLocation.bind(this);
        this.geoLocationBus = this.geoLocationBus.bind(this);

    }
    

    componentWillMount() {

        let cidadePath = window.location.pathname.split('/')[2]
        let itinerarioPath = window.location.pathname.split('/')[3]
        this.geoLocation();
        this.geoLocationBus(cidadePath, itinerarioPath);
    }


    componentDidUpdate(prevProps, prevState) {

        const {
            key,
            busLocation
        } = prevState;

        const {

            emaiUserBus,
            emailCurrentUser,
            cidade,
            latitudeBus,
            longitudeBus,
            latUser,
            lngUser,
            itinerario,
            error
        } = this.state;

        if(this.state.busLocation !== null ){

            let keyState = this.state.key.toString();
            let busState = this.state.busLocation[keyState];
            
            if(this.state.bus === null || prevState.bus !== this.state.bus){
                this.setState({
                    bus: busState
                });
            }

            if(prevState.key !== this.state.key){

                this.setState({

                    bus: busState

                });

            }

        }

    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
    }

    geoLocationBus(cidadePath, itinerarioPath) {

        db.onGetLocationLine(cidadePath, itinerarioPath).limitToLast(1).on('value', (snapshot) => {
            let snapshott = snapshot.val();
            let key = Object.keys(snapshott);
            let busLocation = snapshott;

            this.setState({ busLocation, key });

        });

    }

    geoLocation() {
        if (!navigator.geolocation) {
            this.setState({ error: 'Infelizmente o seu navegador que você está utilizando não suporta geolocalização.' })
        } else {
            this.watchId = navigator.geolocation.watchPosition(
                (position) => {
                    this.setState({ latUser: position.coords.latitude, lngUser: position.coords.longitude });
                },
                (error) => this.setState({
                    error: error.message
                }), {
                    enableHighAccuracy: false,
                    timeout: 60000,
                },
            );
        }
    }

    render() {
        const {
            emaiUserBus,
            emailCurrentUser,
            cidade,
            latitudeBus,
            longitudeBus,
            latUser,
            lngUser,
            bus
        } = this.state;

        const { google } = this.props;

        return (
            <div>
            {
                bus 
                
                ? 
                        <Map
                            google={google}
                            className={'map'}
                            zoom={15}
                            center={{
                                lat: bus.latitude,
                                lng: bus.longitude
                            }
                            }  >


                            <Marker
                                name={'Você está aqui <3'}
                                position={{ lat: latUser, lng: lngUser }}
                                icon={{
                                    url: require('../images/person.png')
                                }}
                            />

                            <Marker
                                name={'Você está aqui <3'}
                                position={{ lat: bus.latitude, lng: bus.longitude }}
                                icon={{
                                    url: require('../images/bus.png')
                                }}
                            />


                            <div className="mensagem-map-share">
                                Quando se alocar na van ou no ônibus ajude também as outras pessoas. :D
               </div>



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

                        </Map >
                :
              
                <div className="container">
                  carregando...
                </div>
                
            }
          </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_API_MAP)
})(MapView);