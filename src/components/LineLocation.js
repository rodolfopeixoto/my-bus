import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import '../stylesheets/Map.css';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import 'font-awesome/css/font-awesome.min.css';

class LineLocation extends Component {

  constructor(props){
    super(props);
    this.state = { 
      selectedPlace: { name: '' },
      lat: -21.762690,
      long: -41.318488
    }
  }

  componentWillMount(){
    this.getLocation();
    console.log('componentWillMount');
  }

  componentWillUpdate() {
    this.updateLocation();
    console.log('componentWillUpdate');
  }

  getLocation(){
    let lat = null;
    let long = null;
    console.log('getLocation: 23')
    if(!!navigator.geolocation){
      //support

      navigator.geolocation.getCurrentPosition((position) => {
        lat  = position.coords.latitude;
        long = position.coords.longitude;

        console.log('Latitude: ' + lat);
        console.log('Latitude: ' + long);

         this.setState({
           lat: lat,
           long: long
         });

      })
     
      
    }else{
      //No support
    }
  }
  

  updateLocation(){
    let id = navigator.geolocation.watchPosition((position) => {
      var coords = position.coords;
      let lat = null;
      let long = null;

      if (this.state.lat === coords.latitude && this.state.long === coords.longitude) {
        console.log('Congratulations, you reached the target');
        navigator.geolocation.clearWatch(id);
      }


      lat  = coords.latitude;
      long = coords.longitude;

      console.log('Latitude: ' + lat);
      console.log('Latitude: ' + long);

      this.setState({
        lat: lat,
        long: long
      });

    }, (err) => {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    });
  }

  render() {
    return (
          <Map
            google={this.props.google} 
            zoom={15}
            center={{
              lat: this.state.lat,
              lng: this.state.long
            }}
            onClick={this.onMapClicked}
            >
            
      <a href="javascript:void(0)" className="float" id="menu-share"> 
          <i class="fa fa-share my-float"></i>
      </a>
        <ul className="fab">

          <li>
            <a href="https://www.facebook.com/meuonibusBR" target="_blank">
              <i className="fa fa-facebook my-float"></i>
            </a>
            <div class="label-container">
              <div class="label-text">Facebook</div>
              <i class="fa fa-play label-arrow"></i>
            </div>
          </li>
          <li>
            <Link to={routes.SEARCH_BUS}>
              <i className="fa fa-undo my-float"></i>
            </Link>
            <div class="label-container">
              <div class="label-text">Voltar</div>
              <i class="fa fa-play label-arrow"></i>
            </div>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-map-marker my-float"></i>
            </a>
            <div class="label-container">
              <div class="label-text">Ponto de Ônibus</div>
              <i class="fa fa-play label-arrow"></i>
            </div>
          </li>
        </ul>

          <InfoWindow onClose={this.onInfoWindowClose}>
              <div>
                <h1>{this.state.selectedPlace.name}</h1>
              </div>
          </InfoWindow>

        </Map>
    );
  }
}

const style = {
  width: '100%',
  height: '100%'
}

export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_API_MAP)
})(LineLocation)