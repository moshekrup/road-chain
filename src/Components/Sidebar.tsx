import React from 'react'
import { withStyles, MenuItem } from '@material-ui/core';
import ListItem from './ListItem';
import { Event, eventTypeToName } from '../Models/Event';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Fade from '@material-ui/core/Fade';
import Menu from '@material-ui/core/Menu';
import { TransitionGroup } from 'react-transition-group';

@(withStyles as any)({
  root: {
    width: 400,
    position: 'relative',
    backgroundColor: '#eee'
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
  },
  eventsList: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    overflowY: 'scroll',
    height: '100%',
  },
  listItem: {
    marginTop: 10,
    '&:last-child': {
      marginBottom: 20,
    }
  },
  loaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  }
})
export default class Sidebar extends React.PureComponent<
  {
    classes?: any,
    events: Event[],
    onAddClicked: (type: Event['type']) => void,
    isChoosingLocation: boolean,
    isLoading: boolean,
  },
  {
    chooseReportTypeAnchorElement: HTMLElement | null,
  }
> {
  onAddClicked = (event: MouseEvent) => {
    this.setState({
      chooseReportTypeAnchorElement: event.currentTarget as HTMLElement,
    });
  }

  onReportTypeSelected = (eventType: Event['type']) => {
    this.closeMenu();
    this.props.onAddClicked(eventType);
  }

  closeMenu = () => {
    this.setState({
      chooseReportTypeAnchorElement: null,
    });
  }

  constructor(props: any) {
    super(props);

    this.state = {
      chooseReportTypeAnchorElement: null,
    };
  }

  getSortedEvents(): Event[] {
    const copy = [...this.props.events];
    copy.sort((event1, event2) => {
      return event1.date.getTime() - event2.date.getTime();
    });
    return copy;
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <Fade 
          in={this.props.isChoosingLocation}
          mountOnEnter
          unmountOnExit>
          <div className={this.props.classes.chooseLocationOverlay}>
            Choose location on map
          </div>
        </Fade>

        {
          /*this.props.isLoading ?
          <div className={this.props.classes.loaderContainer}>
            <CircularProgress />
          </div> :
          null
          */
        }

        <Fab
          onClick={this.onAddClicked as any} 
          className={this.props.classes.addButton}
          color="secondary">
          <AddIcon />
        </Fab>

        <Menu
          anchorEl={this.state.chooseReportTypeAnchorElement}
          open={this.state.chooseReportTypeAnchorElement != null}
          onClose={this.closeMenu}>
          {
            Object.keys(eventTypeToName).map(key =>
              <MenuItem 
                key={key}
                onClick={() => this.onReportTypeSelected(key as Event['type'])}>
                {eventTypeToName[key as Event['type']]}
              </MenuItem>
            )
          }
        </Menu>

        <div className={this.props.classes.eventsList}>
          <TransitionGroup>
            {this.getSortedEvents().map(event =>
              <Fade timeout={800} key={event.id}>
                <ListItem 
                  className={this.props.classes.listItem}
                  event={event} />
              </Fade> 
            )}
          </TransitionGroup>
        </div>
      </div>
    );
  }
}