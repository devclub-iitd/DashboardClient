import React from 'react';
import { Redirect, Router, Route, Switch, HashRouter } from 'react-router-dom';
import { createHashHistory } from 'history';
// import { Provider } from 'react-redux';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Health from './pages/Health';
import './App.css';
// import ConfigureStore from './store';

const hist = createHashHistory();

function App() {
    return (
        // <Provider store={ConfigureStore}>
        <HashRouter>
            <Router history={hist}>
                <Switch>
                    <Route exact path="/healthz" component={Health} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route path="/dashboard/:subPage" component={Dashboard} />
                    <Redirect from="/" to="/dashboard/home" />
                </Switch>
            </Router>
        </HashRouter>
        // </Provider>
    );
}

export default App;
