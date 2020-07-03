import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import App from './App';
import theme from './theme';
// import Health from './pages/Health';
import * as serviceWorker from './serviceWorker';
import ConfigureStore from './store';

// ------------------- May be used for /healthz---------------------------------------------------

// function getUrlVars() {
//   const vars = [];
//   let hash;
//   const hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
//   for (let i = 0; i < hashes.length; i++) {
//     hash = hashes[i].split('=');
//     vars.push(hash[0]);
//     vars[hash[0]] = hash[1];
//   }
//   return vars;
// }

// const urlParams = getUrlVars();

// switch (urlParams.startPage) {
//   case 'Health':
//     ReactDOM.render(<Health />, document.getElementById('root'));
//     break;

//   case undefined:
//   default:
//     ReactDOM.render(
//       <Provider store={ConfigureStore()}>
//         {/* <PersistGate loading={null} persistor={persistor}> */}
//         <BrowserRouter>
//           <MuiThemeProvider theme={theme}>
//             <App />
//           </MuiThemeProvider>
//         </BrowserRouter>
//         {/* </PersistGate> */}
//       </Provider>,
//       document.getElementById('root'),
//     );
// }

// -----------------------------------------------------------------------------

ReactDOM.render(
    <Provider store={ConfigureStore()}>
        {/* <BrowserRouter> */}
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </MuiThemeProvider>
        {/* </BrowserRouter> */}
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
