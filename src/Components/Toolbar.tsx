import React from 'react'
import logo from '../Assets/logo.png';
import argusLogo from '../Assets/argus-logo.png';
import AppBar from '@material-ui/core/AppBar';
import MaterialToolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core';

@(withStyles as any)({
  root: {},
  logo: {
    height: 60,
    marginRight: 10,
  },
  argusLogo: {
    height: 30,
  },
  title: {
    fontSize: 26,
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
  }
})
export default class Toolbar extends React.PureComponent<
  {
    classes?: any,
  }
> {
  render() {
    return (
      <AppBar 
        className={this.props.classes.root} 
        position="static" 
        color="primary">
        <MaterialToolbar className={this.props.classes.toolbar}>
          <img 
            src={logo}
            className={this.props.classes.logo} />
          <div className={this.props.classes.title}>
            Road Chain
          </div>
          <div style={{flex: 1}} />
          <img
            src={argusLogo}
            className={this.props.classes.argusLogo} />
        </MaterialToolbar>
      </AppBar>
    );
  }
}