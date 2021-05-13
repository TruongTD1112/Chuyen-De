import React, { useState } from 'react'
import {Switch, Route, useRouteMatch} from 'react-router-dom'
import BaseLayout from '../../components/BaseLayout'
import { Button, Card, Row, Col, Menu } from 'antd';
import SideMenu from './SideMenu'
import BorrowingBooks from './borrowing/BorrowingBooks';
import ExtendBooks from './extend/ExtendBooks'
import RegisterBorrow from './register'
import {EXTEND, BORROWING,REGISTER_BORROW} from '../../redux/reducers/BookManagementMenuReducer'


const BookManagement = props => {
    let {path, url} = useRouteMatch()
    return (
        <BaseLayout>
        <Row gutter={[24, 8]}>
            <Col span={4}>
                <SideMenu path={path} url={url}/>
            </Col>
            <Col span={20}>
                <Switch>
                    <Route exact={false} path={path + BORROWING}>
                        <BorrowingBooks/>
                    </Route>
                    <Route  exact={false} path={path + REGISTER_BORROW}>
                        <RegisterBorrow/>
                    </Route>
                    <Route exact={false} path={path + EXTEND}>
                        <ExtendBooks/>
                    </Route>    
                    
                </Switch>
            </Col>
        </Row>
            
            <div></div>
        </BaseLayout>
    )
}

export default BookManagement