import React, { PureComponent } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import * as Leaflet from 'leaflet';
import { Event } from '../../Models/Event'; 
import _ from 'lodash';

type Props = {
  lat: number;
  lng: number;
  zoom: number;
  className: string;
  onClick: (lat: number, lng: number) => void;
  events: Event[];
  onMoved: (lat: number, lng: number) => void;
}

export default class BaseMap extends PureComponent<Props> {
  onMapClicked = (event: Leaflet.LeafletMouseEvent) => {
    this.props.onClick(event.latlng.lat, event.latlng.lng)
  }

  // onMapMoved = _.debounce((event: Leaflet.LeafletMouseEvent) => {
  //   console.log(event);
  //   // this.props.onMoved(event.latlng.lat, event.latlng.lng);
  // }, 500)

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
          // onMove={this.onMapMoved}
          >
          <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {this.props.events.map(event =>
            <Marker
              position={{lat: event.latitude, lng: event.longitude}}
              key={event.id}>
            </Marker>
          )}
        </Map>
    );
  }
}