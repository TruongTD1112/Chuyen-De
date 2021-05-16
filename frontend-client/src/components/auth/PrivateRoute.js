import React, {useState, useEffect} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {getCookieByName} from '../../utils/cookieHandler'
const PrivateRoute = ({component: Component, ...rest}) => {
    const [auth, setAuth] = useState(true);

    useEffect(()=> {
        const id = getCookieByName('u_id') 
        if (id == null || id.length !=24){
            setAuth(false);
        } 
    },[window.location])
    return (
        <Route {...rest}>
            {!auth ? <Redirect to = "/client/login"/>: <Component />}
        </Route>
    )
}

export default PrivateRoute