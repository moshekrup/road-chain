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
    isLoading: boolean,
    events: Event[],
  }
> {
  constructor(props: any) {
    super(props);

    this.state = {
      editingReport: null,
      events: [],
      isLoading: false,
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

  async reloadEvents(latitude: number, longitude: number) {
    this.setState({
      isLoading: true
    });

    try {
      const response = await fetch('http://localhost:9000/getRoadData', {
        method: 'POST',
        body: JSON.stringify({
          location: [32.0804808, 34.7805274],
          radius: 10
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

  // componentDidMount() {
  //   this.reloadEvents();
  // }

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
              events={this.state.events}
              isLoading={this.state.isLoading} />
            <BaseMap
              className={this.props.classes.map} 
              lat={51.505} 
              lng={-0.09} 
              zoom={18}
              events={this.state.events}
              onClick={this.onMapClicked}
              onMoved={this.reloadEvents} />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
