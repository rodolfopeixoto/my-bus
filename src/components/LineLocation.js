import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
require('dotenv').config()

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
      <div className="App">
        <Map 
          google={this.props.google} 
          zoom={15}
          style={style}
          center={{
            lat: this.state.lat,
            lng: this.state.long
          }}
          onClick={this.onMapClicked}
          >
        <Marker 
            name={'Your position'}
            position={{ lat: this.state.lat, lng: this.state.long }}
        />

        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>

      </Map>
      </div>
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