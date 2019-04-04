import React from 'react'
import BaseMap from './Components/BaseMap/BaseMap';
import './App.css';
import Toolbar from './Components/Toolbar';
import Sidebar from './Components/Sidebar';
import { withStyles } from '@material-ui/core';
import { Event, ServerEvent, serverEventToEvent } from './Models/Event';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { theme } from './theme';
import { socket } from './webSocket';
import { type } from 'os';

const initialLocation = {
  latitude: 32.0804808,
  longitude: 34.7805274,
};

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
    flex: 1,
    overflow: 'hidden',
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
    isLoading: boolean,
    events: Event[],
    location: {
      latitude: number,
      longitude: number,
    }
  }
> {
  constructor(props: any) {
    super(props);

    this.state = {
      editingReport: null,
      events: [],
      isLoading: false,
      location: initialLocation,
    };
  }

  async componentDidMount() {
    await this.reloadEvents();
    socket.addEventListener('message', async(event: any) => {
      console.log('received new event');
      await this.reloadEvents();
    });
    socket.addEventListener('error', (err) => {
      console.error(err);
    });
    socket.addEventListener('close', () => {
      console.log('closed connection');
    });
  }

  onMapClicked = (lat: number, lng: number) => {
    if (this.state.editingReport !== null) {
      console.log('saving event');
      socket.send(JSON.stringify({
        type: this.state.editingReport.type,
        geoJson: {
          type: 'Point', 
          coordinates: [lat,lng]
        }
      }));
      this.setState({
        editingReport: null,
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

  onMapMoved = (latitude: number, longitude: number) => {
    console.log('map moved');
    this.setState(
      {
        location: {
          latitude,
          longitude,
        }
      },
      this.reloadEvents
    );
  }

  reloadEvents = async() => {
    console.log('reloading events');
    this.setState({
      isLoading: true
    });

    try {
      const response = await fetch('http://localhost:9000/getRoadData', {
        method: 'POST',
        body: JSON.stringify({
          location: [
            this.state.location.latitude,
            this.state.location.longitude
          ],
          radius: 1000
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const events: ServerEvent[] = await response.json();
        console.log(events);
        this.setState({
          events: events.map(serverEventToEvent)
        });
      }
      else {
        console.error(response);
        throw new Error('Failed to load road data');
      }
    }
    finally {
      this.setState({
        isLoading: false,
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
              isChoosingLocation={this.state.editingReport !== null}
              onAddClicked={this.onEventTypeSelected} 
              events={this.state.events}
              isLoading={this.state.isLoading} />
            <BaseMap
              className={this.props.classes.map} 
              lat={initialLocation.latitude} 
              lng={initialLocation.longitude} 
              zoom={18}
              events={this.state.events}
              onClick={this.onMapClicked}
              onMoved={this.onMapMoved} />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
