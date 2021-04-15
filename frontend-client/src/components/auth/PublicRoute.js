import React from 'react'
import {Route, Redirect} from 'react-router-dom'

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Component/>
    )
}

export default PrivateRoute