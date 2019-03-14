import React from 'react';
import './map.css';

export default class StreetView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lat: this.props.location.state.lat,
            lng: this.props.location.state.lng
        }
    }

    componentDidMount() {
        new window.google.maps.StreetViewPanorama(
            document.getElementById('street-view'),
            {
              position: {lat: this.state.lat, lng: this.state.lng},
              pov: {heading: 165, pitch: 0},
              zoom: 1
            });
    }

  render() {
    return (
        <div id='street-view' style = {{ height: "80vh", width: "80vw", left: "10vw", overflow : "visible", position: "absolute"}}/>
    );
  }
};