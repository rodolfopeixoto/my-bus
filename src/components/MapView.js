import React, { Component } from 'react';
import * as routes from '../constants/routes';
import { Link } from 'react-router-dom';
import { auth, db } from './../firebase';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import '../stylesheets/Map.css';
import 'font-awesome/css/font-awesome.min.css';



const INITIAL_STATE = {
    email: '',
    emailCurrentUser: '',
    cidade: 'campos-dos-goytacazes',
    latitudeBusBus: null,
    longitudeBusBus: null,
    itinerario: '',
    timestamp: null,
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    error: null,
    key: null,
    busLocation: null
}

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});


class MapView extends Component {

    constructor(props) {
        super(props);
        this.state                  = { ...INITIAL_STATE }
        this.geoLocationBus         = this.geoLocationBus.bind(this);


        let cidadePath = window.location.pathname.split('/')[2]
        let itinerarioPath = window.location.pathname.split('/')[3]
        this.geoLocationBus(cidadePath, itinerarioPath);
    }


    componentWillUpdate(nextProps, nextState) {

        if(this.state.key != nextState.key){
            

            console.log('componentWillUpdate');
            console.log("nextState.latitude: ", nextState.busLocation);
            console.log("nextState.key: ", nextState.key);
            console.log("keyState", this.state.key);

            let cidadePath = window.location.pathname.split('/')[2]
            let itinerarioPath = window.location.pathname.split('/')[3]
            
                this.setState({
                    busLocation: nextState.busLocation,
                    key: nextState.key
                })
 
        }
            
      
    }

    componentWillMount() {

        let cidadePath = window.location.pathname.split('/')[2]
        let itinerarioPath = window.location.pathname.split('/')[3]
        let bus = null;
        
        this.setState({ emailCurrentUser: auth.getUser().email, itinerario: itinerarioPath })
        this.geoLocationBus(cidadePath, itinerarioPath);
    }

    geoLocationBus(cidadePath, itinerarioPath) {
        
        db.onGetLocationLine(cidadePath, itinerarioPath).limitToLast(1).on('value', (snapshot) => {
                let snapshott = snapshot.val();
                let key = Object.keys(snapshott);
                let busLocation = snapshott
            this.setState({ busLocation, key });

            });

    }


    componentDidMount(){

        console.log('DidMoun');
        console.log(this.state);
    }

    render() {
        console.log('Render')
        const {
            latitudeBus,
            longitudeBus,
            activeMarker,
            busLocation,
            key
        } = this.state;


        return (
            <div> 
                {!!busLocation && <MapViewRender busLocation={busLocation} key={key} />}
            </div>
        );
    }
}




const INITIAL_STATE_MAP = {
    latitude: null,
    longitude: null,
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
}

class MapViewRender extends React.Component{

    constructor(props){
        super(props);
        this.state = { ...INITIAL_STATE_MAP}
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClicked = this.onMapClicked.bind(this);
    }

    componentWillMount(){
        const {
            busLocation
        } = this.props;
      
        console.log("ComponentWillMount() => ", busLocation[Object.keys(busLocation)].latitude)

        let latitude = busLocation[Object.keys(busLocation)].latitude;
        let longitude = busLocation[Object.keys(busLocation)].longitude;
        this.setState({latitude, longitude});
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



    render(){
     const {
            latitude,
            longitude,
            showingInfoWindow,
            activeMarker,
            selectedPlace
        } = this.state;


        const {
            busLocation,
            key
        } = this.props;

        return(
            <div>
            {     
                    <div>
                    
                            <Map
                                google={this.props.google}
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
                                        url: require('../images/bus.png')
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
                    </div>
                 

            }
            </div>
        );
    }
}




export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_API_MAP)
})(MapView);