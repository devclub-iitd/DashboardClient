import {useState,useEffect} from 'react';

const USER_ID_KEY = "userId";
const ACCESS_TOKEN_KEY = "accessToken";
const loggedOutState = {userId: null,accessToken: null,isLoggedIn: false};

export const useLoginState = () => {
    const [loginState, setLoginState] = useState(loggedOutState);

    useEffect(() => {
        console.log("useLoginState hook effect called!");

        const accessToken = window.localStorage.getItem(ACCESS_TOKEN_KEY);
        const userId = window.localStorage.getItem(USER_ID_KEY);
        let isLoggedIn = false;
        if(accessToken != null) {
            isLoggedIn = true;
        }
        setLoginState({isLoggedIn,accessToken,userId});
    },[loginState.isLoggedIn]);
    
    const logout = () => {
        window.localStorage.removeItem(ACCESS_TOKEN_KEY);
        window.localStorage.removeItem(USER_ID_KEY);
        setLoginState(loggedOutState);
    }

    const login = (accessToken,userId) => {
        window.localStorage.setItem(ACCESS_TOKEN_KEY,accessToken);
        window.localStorage.setItem(USER_ID_KEY,userId);
        setLoginState({...loggedOutState,isLoggedIn:true});
    }
    
    return {loginState,logout,login};
}

export const useErrorState = () => {
    const [errorMessage,setErrorMessage] = useState("");

    const clearError = () => {setErrorMessage("");}
    const showError = setErrorMessage;
    return {errorMessage,showError,clearError};
}