import React from 'react'
import { withStyles } from '@material-ui/core';
import policeIcon from '../Assets/police-icon.png';
import { Event } from '../Models/Event';

const eventTypeToIconUrl: {[eventType in Event['type']]: string} = {
  police: policeIcon,
  traffic: policeIcon,
  accident: policeIcon,
  cyber: policeIcon,
};

function mergeClassNames(classNames: string[]): string {
  return (
    classNames
      .filter(className => className != null)
      .join(' ')
  );
}

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
    marginRight: 10,
  }
})
export default class ListItem extends React.PureComponent<
  {
    event: Event,
    classes?: any,
    className?: string,
    style?: React.CSSProperties,
  }
> {
  render() {
    return (
      <div 
        className={mergeClassNames([this.props.classes.root, this.props.className])}
        style={this.props.style}>
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