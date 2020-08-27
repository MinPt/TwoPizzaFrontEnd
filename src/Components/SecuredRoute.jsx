import React from "react";
import {Route, Redirect} from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

const SecuredRoute = ({component: Component, ...rest}) => {
const { isAuthenticated } = useAuth0();


    return (
        <Route {...rest} render={
            (props) => {
                if(isAuthenticated){
                    return <Component {...props} {...rest}/>
                }else{
                    return (<Redirect to={
                        {pathname: "/",
                        state: {
                            from: props.location
                        }
                        }
                    } />)
                }

            }
        } />
    )
}

export default SecuredRoute;