/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  Redirect, Router, Route, Switch, withRouter,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Health from './pages/Health';
import './App.css';
// import { ConfigureStore } from './store';

const hist = createBrowserHistory();
// const store = ConfigureStore();

function App() {
  return (
    <Router history={hist}>
      <Switch>
        <Route path="/healthz" component={Health} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard/:subPage" component={Dashboard} />
        <Redirect from="/" to="/dashboard/home" />
      </Switch>
    </Router>
  );
}

// class App extends Component {
//   render() {
//     return (
//       <Provider store={store}>
//         <Router history={hist}>
//           <Switch>
//             <Route path="/login" component={Login} />
//             <Route path="/register" component={Register} />
//             <Route path="/dashboard/:subPage" component={Dashboard} />
//             <Redirect from="/" to="/dashboard/home" />
//           </Switch>
//         </Router>
//       </Provider>
//     );
//   }
// }

export default withRouter(App);
