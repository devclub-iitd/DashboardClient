import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import App from './App';
import logo from './components/logo.png';
import * as serviceWorker from './serviceWorker';
import ConfigureStore from './store';

// const { store, persistor } = ConfigureStore();

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0288d1',
      light: '#5eb8ff',
      dark: '#005b9f',
      contrastText: '#fff',
    },
    secondary: {
      main: '#00c853',
      light: '#5efc82',
      dark: '#009624',
      contrastText: '#000',
    },
  },
});

ReactDOM.render(
  <Provider store={ConfigureStore()}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </BrowserRouter>
    {/* </PersistGate> */}
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
