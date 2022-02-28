import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default class Map extends Component {
  static defaultProps = {
    center: {
      lat: 50.736603,
      lng: -3.533233
    },
    zoom: 19
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDv-LEbSc-bYO2UUkBXmiJ-l846ItAKhL4"}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={50.736603}
            lng={-3.533233}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}