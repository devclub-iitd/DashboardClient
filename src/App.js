import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import DashboardComponent from "./components/DashboardComponent";
import SidebarComponent from "./components/SidebarComponent";
import HeaderComponent from "./components/HeaderComponent";
import LoginComponent from "./components/LoginComponent";


import {useLoginState,useErrorState} from "./utils/hooks";
import {GlobalContext} from "./utils/context";


function App() {
  const [showLoader,setLoading] = useState(false);
  const {loginState,logout,login} = useLoginState();
  const {errorMessage,showError,clearError} = useErrorState();

  const globals = {
    loginState,
    logout,
    login,
    setLoading,
    showError,
    clearError
  };

  return (
    <GlobalContext.Provider value={globals}>
      <Router>
        <div>
          {showLoader ?
            <div className="page-loader">
              <CircularProgress />
            </div>
            :
            loginState.isLoggedIn ?
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
          <button onClick={()=>{showError("You click error!");}}>Show error!</button>
          <Snackbar open={errorMessage.length!==0} message={errorMessage} autoHideDuration={10000}
                                  onClose={clearError}
                                  action={(
                                    <IconButton key="close" aria-label="Close" color="inherit" onClick={clearError}>
                                      <CloseIcon />
                                    </IconButton>
                                  )}/>
        </div>
      </Router>
    </GlobalContext.Provider>
  )
}

export default App;