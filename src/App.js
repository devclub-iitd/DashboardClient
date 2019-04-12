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
import SignupComponent from "./components/SignupComponent";
import {Login as LoginAPI} from "./utils/Api";

import {useLoginState,useErrorState,useLoggedInUser} from "./utils/Hook";
import {GlobalContext} from "./utils/Context";
import {GITHUB_OAUTH_CLIENT_ID} from "./utils/Constant";


function App() {
  const [showLoader,setLoading] = useState(false);
  const {loginState,logout,login} = useLoginState();
  const {loggedInUser,refetchUser} = useLoggedInUser(loginState.isLoggedIn,loginState.userId);
  const {errorMessage,showError,clearError} = useErrorState();

  const globals = {
    loginState,
    logout,
    login,
    setLoading,
    showError,
    clearError,
    loggedInUser,
    refetchUser
  };

  console.log(`Re rendering! isLoggedIn: ${loginState}`);

  return (
    <GlobalContext.Provider value={globals}>
      <Router>
        <div>
          {showLoader ?
            <div className="page-loader">
              <CircularProgress />
            </div>
            :null
          }
          {
            loginState.isLoggedIn ?
              <div>
                <HeaderComponent />
                <div>
                  <SidebarComponent />
                  {
                    (!loggedInUser.isFilled) ?
                    <Switch>
                      <Route exact path="/signup" component={SignupComponent} />
                      <Redirect to="/signup" />
                    </Switch>
                    :
                    <Switch>
                      <Route exact path="/" component={DashboardComponent} />
                      <Redirect to="/" />
                    </Switch>
                  }
                </div>
              </div>
              :
              <Switch>
                <Route exact path={"/"+LoginAPI.redirectURI()} component={LoginComponent} />
                <Route component={() => { window.location = LoginAPI.githubLogin(GITHUB_OAUTH_CLIENT_ID,LoginAPI.fullRedirectURI()); return null;} }/>
              </Switch>
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