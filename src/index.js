import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import CssBaseline from '@material-ui/core/CssBaseline';

import App from './App';

const theme = createMuiTheme({
    palette: {
      primary: {
        light: purple[300],
        main: purple[500],
        dark: purple[700],
      },
      secondary: {
        light: green[300],
        main: green[500],
        dark: green[700],
      },
    },
    typography: {
      useNextVariants: true,
    },
  });
  
ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </MuiThemeProvider>
, document.getElementById('root'))
serviceWorker.unregister();
