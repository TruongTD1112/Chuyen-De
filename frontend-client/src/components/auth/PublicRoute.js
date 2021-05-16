import React from 'react'
import {Route, Redirect} from 'react-router-dom'

const PublicRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest}>
            <Component/>
        </Route>
    )
}

export default PublicRoute