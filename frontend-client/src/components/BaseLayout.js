import React, { Fragment } from 'react'
import { Row, Col, Layout } from 'antd'
import Header from './Header'

const { Footer} = Layout

const BaseLayout = ({ children, ...props }) => {
    return (
        <Fragment>
            <Header />
            
                <div style={{minHeight:'100vh'}}>
                {children}
                </div>
            
            <Footer style={{ textAlign: 'center' }}>Library management ©2021 Created by Truong Tran</Footer>
        </Fragment>
    )
}

export default BaseLayout