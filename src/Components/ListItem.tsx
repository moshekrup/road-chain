import React from 'react'
import { withStyles } from '@material-ui/core';
import policeIcon from '../Assets/police-icon.png';
import { Event } from '../Models/Event';

const eventTypeToIconUrl: {[eventType in Event['type']]: string} = {
  police: policeIcon,
  traffic: policeIcon,
};

@(withStyles as any)({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 2,
    paddingBottom: 2,
  },
  icon: {
    height: 50,
  }
})
export default class ListItem extends React.PureComponent<
  {
    event: Event,
    classes?: any,
  }
> {
  render() {
    return (
      <div className={this.props.classes.root}>
        <img 
          src={eventTypeToIconUrl[this.props.event.type]}
          className={this.props.classes.icon} />

        <div className={this.props.classes.content}>
          Police Event
        </div>
      </div>
    );
  }
}