import React from 'react'
import logo from '../Assets/logo.png';
import AppBar from '@material-ui/core/AppBar';
import MaterialToolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core';

@(withStyles as any)({
  root: {},
  logo: {
    width: 100,
    marginRight: 10,
  },
  title: {
    fontSize: 26,
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
        <MaterialToolbar>
          <img 
            src={logo}
            className={this.props.classes.logo} />
          <div className={this.props.classes.title}>
            Road Chain
          </div>
        </MaterialToolbar>
      </AppBar>
    );
  }
}