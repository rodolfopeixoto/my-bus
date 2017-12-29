import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Header from './../components/Header';
class MapComponent extends Component {

  constructor(props){
    super(props);
    this.state = { selectedPlace: {name: ''} }
  }
  
  render() {
    return (
      <div className="App">

        <Header linkBack={'/search'} />
        <Map 
          google={this.props.google} 
          zoom={15}
          style={style}
          initialCenter={{
            lat: -21.762690,
            lng: -41.318488
          }}
          onClick={this.onMapClicked}
          >

        <Marker 
            name={'Your position'}
            position={{ lat: -21.762690, lng: -41.318488 }}
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
  apiKey: ('AIzaSyCgucw6vRRf7ghik147VgXJLdgygLSklPU')
})(MapComponent)