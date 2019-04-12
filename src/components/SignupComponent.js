import React, { useContext } from 'react';
import EditProfileComponent from "./EditProfileComponent";
import {update as updateUserAPI} from "../services/User";
import {GlobalContext} from "../utils/Context";
import { withRouter } from "react-router";

let SignupComponent = (props) => {
    const {history} = props;
    const {loggedInUser,showError,refetchUser} = useContext(GlobalContext);

    const updateUser = (changedUser) => {
        updateUserAPI(changedUser.id,{...changedUser,isFilled: true})
        .then(newUser => {
            refetchUser();
            history.push("/");
        })
        .catch(err => {
            console.log(err);
            showError(err.message);
        });
    }
    return (
        <EditProfileComponent callback={updateUser} user={loggedInUser} />
    );
};

SignupComponent = withRouter(SignupComponent);

export default SignupComponent;