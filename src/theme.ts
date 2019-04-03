import createMuiTheme, { Theme } from '@material-ui/core/styles/createMuiTheme';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';
import green from '@material-ui/core/colors/green';

export const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      dark: '#222',
      light: '#222',
      main: '#222'
    },
    secondary: green,
  }
});