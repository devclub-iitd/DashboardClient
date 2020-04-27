import React from 'react';
import {
  Redirect, Router, Route, Switch, withRouter,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Health from './pages/Health';
import './App.css';

const hist = createBrowserHistory();

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

export default withRouter(App);
