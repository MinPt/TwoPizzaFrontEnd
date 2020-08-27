import React from "react";
import { useAuth0 } from '@auth0/auth0-react'


const Authorization: React.FC = (props: any) => {
    const {loginWithPopup, logout, isAuthenticated } = useAuth0();

    if(!isAuthenticated){
        return (
            <button id="loginBtn" onClick={() => loginWithPopup()}
                    className="btn btn-outline-success">
                LogIn
            </button>
        )
    }else{
        return (
            <button id="loginBtn" onClick={() => logout()}
                    className="btn btn-outline-danger">
                LogOut
            </button>
        )
    }
}

export default Authorization;