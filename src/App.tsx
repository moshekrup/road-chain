import React from 'react'
import BaseMap from './Components/BaseMap/BaseMap';
import './App.css';
import Toolbar from './Components/Toolbar';
import Sidebar from './Components/Sidebar';
import { withStyles } from '@material-ui/core';
import { Event } from './Models/Event';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { theme } from './theme';
import { socket } from './webSocket';

const events: Event[] = [
  {
    id: '1',
    type: 'police',
  },
  {
    id: '2',
    type: 'traffic'
  }
];

@(withStyles as any)({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  drawerAndMap: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1
  },
  map: {
    flex: 1,
  }
})
export default class App extends React.PureComponent<
  {
    classes?: any,
  },
  {
    mode: 'normal' | 'choose-location'
  }
> {
  constructor(props: any) {
    super(props);

    this.state = {
      mode: 'normal'
    };
  }

  onMapClicked = (lat: number, lng: number) => {
    if (this.state.mode === 'choose-location') {
      socket.send(JSON.stringify({
        type: 'traffic',
          geoJson: {
            type: "Point", 
            coordinates:[lat, lng]
        }
      }));

      this.setState({
        mode: 'normal',
      });
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className={this.props.classes.root}>
          <Toolbar />

          <div className={this.props.classes.drawerAndMap}>
            <Sidebar
              mode={this.state.mode}
              onAddClicked={() => this.setState({mode: 'choose-location'})} 
              events={events} />
            <BaseMap
              className={this.props.classes.map} 
              lat={51.505} 
              lng={-0.09} 
              zoom={18}
              onClick={this.onMapClicked} />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}