import React, { useContext } from 'react';
import {GlobalContext} from "../utils/context";

const LoginComponent = () => {
    const {login} = useContext(GlobalContext);
    return (
        <div>
            <h1>Login Component</h1>
            <button onClick={(event)=>{event.preventDefault(); login("blabbla","blabla");}}>Login</button>
        </div>
    )
}

export default LoginComponent;
