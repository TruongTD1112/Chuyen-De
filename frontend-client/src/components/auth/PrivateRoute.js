import React from 'react'
import {Route, Redirect} from 'react-router-dom'

const PrivateRoute = ({component: Component, ...rest}) => {
    const isAuth = true
    return (
        <Route {...rest}>
            {!isAuth ? <Redirect to = "/client/login"/>: <Component />}
        </Route>
    )
}

export default PrivateRoute