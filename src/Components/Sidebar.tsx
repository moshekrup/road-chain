import React from 'react'
import { withStyles } from '@material-ui/core';
import ListItem from './ListItem';
import { Event } from '../Models/Event';

@(withStyles as any)({
  root: {
    width: 400,
  },
})
export default class Sidebar extends React.PureComponent<
  {
    classes?: any,
    events: Event[],
  }
> {
  render() {
    return (
      <div className={this.props.classes.root}>
        {this.props.events.map(event =>
          <ListItem key={event.id} event={event} /> 
        )}
      </div>
    );
  }
}