import React from 'react'
import { withStyles } from '@material-ui/core';
import ListItem from './ListItem';
import { Event } from '../Models/Event';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Mode } from '../Models/Mode';
import Fade from '@material-ui/core/Fade';

@(withStyles as any)({
  root: {
    width: 400,
    position: 'relative',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  chooseLocationOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: '#000b',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: 24,
  }
})
export default class Sidebar extends React.PureComponent<
  {
    classes?: any,
    events: Event[],
    onAddClicked: () => void,
    mode: Mode,
  }
> {
  render() {
    return (
      <div className={this.props.classes.root}>
        <Fade 
          in={this.props.mode === 'choose-location'}
          mountOnEnter
          unmountOnExit>
          <div className={this.props.classes.chooseLocationOverlay}>
            Choose location on map
          </div>
        </Fade>

        <Fab
          onClick={this.props.onAddClicked} 
          className={this.props.classes.addButton}
          color="secondary">
          <AddIcon />
        </Fab>

        <div>
          {this.props.events.map(event =>
            <ListItem
              key={event.id}
              event={event} /> 
          )}
        </div>
      </div>
    );
  }
}