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
    editingReport: {
      type: Event['type'],
    } | null,
    events: Event[],
  }
> {
  constructor(props: any) {
    super(props);

    this.state = {
      editingReport: null,
      events: [],
    };
  }

  onMapClicked = (lat: number, lng: number) => {
    if (this.state.editingReport !== null) {
      this.setState({
        editingReport: null,
        events: [
          ...this.state.events,
          {
            id: this.state.events.length + '',
            type: this.state.editingReport.type,
            latitude: lat,
            longitude: lng,
          }
        ]
      });
    }
  }

  onEventTypeSelected = (eventType: Event['type']) => {
    this.setState({
      editingReport: {
        type: eventType
      }
    });
  }

  async reloadEvents() {
    const response = await fetch('getRoadData', {
      method: 'POST',
      body: JSON.stringify({
        location: [32.0804808, 34.7805274],
        radius: 10
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log(response);
  }

  componentDidMount() {
    this.reloadEvents();
  }

  render() {
    console.log(this.state.events);

    return (
      <MuiThemeProvider theme={theme}>
        <div className={this.props.classes.root}>
          <Toolbar />

          <div className={this.props.classes.drawerAndMap}>
            <Sidebar
              isChoosingLocation={this.state.editingReport !== null}
              onAddClicked={this.onEventTypeSelected} 
              events={this.state.events} />
            <BaseMap
              className={this.props.classes.map} 
              lat={51.505} 
              lng={-0.09} 
              zoom={18}
              events={this.state.events}
              onClick={this.onMapClicked} />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
