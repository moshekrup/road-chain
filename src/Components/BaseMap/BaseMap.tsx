import React, { PureComponent } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Animate from '../Animate/Animate';
// import './App.css';

type Props = {
  lat: number;
  lng: number;
  zoom: number;
  className: string;
}

export default class BaseMap extends PureComponent<Props> {
  render() {
    const position = {
      lat: this.props.lat, 
      lng: this.props.lng
    };

    console.log(this.props.className);

    return (
        <Map 
          className={this.props.className}
          center={position}
          zoom={this.props.zoom}>
          <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
              <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
          </Marker>
          {/* <Animate></Animate> */}
        </Map>
    );
  }
}