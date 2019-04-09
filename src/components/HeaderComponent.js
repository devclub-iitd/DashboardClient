import React,{useContext} from 'react';
import {GlobalContext} from "../utils/context";

const HeaderComponent = () => {
    const globals = useContext(GlobalContext);

    return (
        <div>
            <h1>Header Component</h1>
            <button onClick={globals.logout}>Logout</button>
        </div>
    )
}

export default HeaderComponent;