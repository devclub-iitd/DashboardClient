import React from 'react';
import {
  Redirect, Router, Route, Switch,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import './App.css';

const hist = createBrowserHistory();

function App() {
  return (
    <Router history={hist}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard/:subPage" component={Dashboard} />
        <Redirect from="/" to="/dashboard/home" />
      </Switch>
    </Router>
  );
}

export default App;
