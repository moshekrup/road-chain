import React, { PureComponent } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Animate from '../Animate/Animate';
import * as Leaflet from 'leaflet';

// import './App.css';

type Props = {
  lat: number;
  lng: number;
  zoom: number;
  className: string;
  onClick: (lat: number, lng: number) => void;
}

export default class BaseMap extends PureComponent<Props> {
  onMapClicked = (event: Leaflet.LeafletMouseEvent) => {
    this.props.onClick(event.latlng.lat, event.latlng.lng)
  }

  render() {
    const position = {
      lat: this.props.lat, 
      lng: this.props.lng
    };

    return (
        <Map 
          className={this.props.className}
          onClick={this.onMapClicked}
          center={position}
          zoom={this.props.zoom}
          >
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