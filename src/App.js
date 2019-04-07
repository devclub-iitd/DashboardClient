import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress";

import DashboardComponent from "./components/DashboardComponent";
import SidebarComponent from "./components/SidebarComponent";
import HeaderComponent from "./components/HeaderComponent";
import LoginComponent from "./components/LoginComponent";

function App() {
  const showLoader = false;
  const isLoggedIn = true;
  return (
    <Router>
      <div>
        {showLoader ?
          <div className="page-loader">
            <CircularProgress />
          </div>
          :
          isLoggedIn ?
            <div>
              <HeaderComponent />
              <div>
                <SidebarComponent />
                <Switch>
                  <Route exact path="/" component={DashboardComponent} />
                  <Redirect to="/" />
                </Switch>
              </div>
            </div>
            :
            <LoginComponent />
        }
      </div>
    </Router>
  )
}

export default App;