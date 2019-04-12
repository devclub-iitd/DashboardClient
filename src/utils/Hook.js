import {useState,useEffect} from 'react';
import {USER_ID_KEY, ACCESS_TOKEN_KEY} from "./Constant";
import User from "../models/User";
import {get as getUser} from "../services/User";

const getCurrentState = () => {
    const accessToken = window.localStorage.getItem(ACCESS_TOKEN_KEY);
    const userId = window.localStorage.getItem(USER_ID_KEY);
    let isLoggedIn = false;
    if(accessToken) {
        isLoggedIn = true;
    }
    return {accessToken,userId,isLoggedIn};
}

const defaultState = getCurrentState();

export const useLoginState = () => {
    const [loginState, setLoginState] = useState(defaultState);

    useEffect(() => {
        console.log("useLoginState hook effect called!");
        setLoginState(getCurrentState());
    },[loginState.isLoggedIn]);
    
    const logout = () => {
        window.localStorage.removeItem(ACCESS_TOKEN_KEY);
        window.localStorage.removeItem(USER_ID_KEY);
        setLoginState({...loginState,isLoggedIn:false});
    }

    const login = (accessToken,userId) => {
        window.localStorage.setItem(ACCESS_TOKEN_KEY,accessToken);
        window.localStorage.setItem(USER_ID_KEY,userId);
        setLoginState({...loginState,isLoggedIn:true});
    }
    
    return {loginState,logout,login};
}

export const useErrorState = () => {
    const [errorMessage,setErrorMessage] = useState("");

    const clearError = () => {setErrorMessage("");}
    const showError = setErrorMessage;
    return {errorMessage,showError,clearError};
}

export const useLoggedInUser = (isLoggedIn,userId) => {
    const [loggedInUser,setLoggedInUser] = useState(new User());
    const refetchUser = ()=>{
        console.log("fetching logged in user");
        getUser(userId)
        .then(fetchedUser => setLoggedInUser(fetchedUser))
        .catch(err => {
            console.log(`Error while fetching logged in user: "${err.message}"`);
        });
    };
    useEffect(()=>{
        if(!isLoggedIn) return;
        refetchUser();
    },[]);

    return {loggedInUser,refetchUser};
}