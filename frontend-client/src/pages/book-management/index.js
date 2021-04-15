import React, { useState } from 'react'
import BaseLayout from '../../components/BaseLayout'
import { Button, Card, Row, Col, Menu } from 'antd';
import {
    BookOutlined,
    PicLeftOutlined,
    FieldTimeOutlined
} from '@ant-design/icons'
import BorrowingBook from './BorrowingBookComponent';

const BORROWING = 'BORROWING'
const REGISTER  = 'REGISTER'
const ADJOURN  = 'ADJOURN'

const BookManagement = props => {

    return (
        <BaseLayout>
        <Row gutter={16}>
            <Col>
            <Menu theme="dark" defaultSelectedKeys={[BORROWING]} style={{height:'100vh', width:200, borderRightWidth: 2}}>
                <Menu.Item key={BORROWING} icon={<BookOutlined/>}>
                    Sách đang mượn
                </Menu.Item>
                <Menu.Item key={REGISTER} icon={<PicLeftOutlined/>}>
                    Đăng ký mượn / trả
                </Menu.Item>
                <Menu.Item key={ADJOURN} icon={<FieldTimeOutlined/>}>
                    Gia hạn
                </Menu.Item>
            </Menu>
            </Col>
            <Col>
                <BorrowingBook/>
            </Col>
        </Row>
            
            <div></div>
        </BaseLayout>
    )
}

export default BookManagement