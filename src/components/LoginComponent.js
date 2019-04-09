import React, { useContext, useEffect } from 'react';
import {GlobalContext} from "../utils/Context";

import {Login as LoginAPI,postRequest} from "../utils/Api";

const LoginComponent = (props) => {
    const {login,setLoading,showError} = useContext(GlobalContext);
    setLoading(true);

    const params = new URLSearchParams(props.location.search);
    const code = params.get('code');

    useEffect(()=>{
        console.log("Calling login hook!");
        
        postRequest(LoginAPI.serverAuth(),{},{code})
        .then((response)=>{
            const {authToken,_id} = response.data;
            console.log({authToken,_id});
            login(authToken,_id);
        })
        .catch(error => {console.log(error); showError(error.message)});

        return () => {
            setLoading(false);
        }
    },[]);

    return (
        <div>
            <h1>Logging you in</h1>
        </div>
    )
}

export default LoginComponent;
