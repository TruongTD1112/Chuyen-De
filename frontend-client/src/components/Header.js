import React, { useState, useEffect } from 'react'
import { Menu, PageHeader, Avatar, Dropdown} from 'antd';
import { UserOutlined } from '@ant-design/icons'
import {connect} from 'react-redux'
import {useHistory, Link} from 'react-router-dom'

import {
    selectHome, 
    selectBookManagement, 
    selectGuide,
    HOME,
    BOOK_MANAGEMENT,
    GUIDE
} from '../redux/reducers/MenuReducer'
const AvatarDropdownMenu = props => {
    return (
        <Menu>
            <Menu.Item key="edit">
                <Link to="/client/edit-profile">Chỉnh thông tin cá nhân</Link>
            </Menu.Item>
            <Menu.Item key="logout">
                Thoát đăng nhập
            </Menu.Item>
        </Menu>
    )
}
const Header = props => {

    const history  = useHistory()
    const onSelectMenuItem = ({key})=>{
        if (key === HOME ) props.selectHome()
        if (key === BOOK_MANAGEMENT) props.selectBookManagement()
        if (key === GUIDE) props.selectGuide()
    }

    useEffect(()=> {
        if (history.location.pathname.includes(HOME)) props.selectHome()
        if (history.location.pathname.includes(BOOK_MANAGEMENT)) props.selectBookManagement()
        if (history.location.pathname.includes(GUIDE)) props.selectGuide()
    },[])

    return (
        <PageHeader
            ghost={false}
            
            title="Logo"
            subTitle={<div>
                <Menu mode="horizontal" onSelect={onSelectMenuItem} selectedKeys={[props.itemSelected]}  >
                    <Menu.Item key={HOME}><Link to={HOME}>Trang chủ</Link></Menu.Item>
                    <Menu.Item   key={BOOK_MANAGEMENT}><Link to={BOOK_MANAGEMENT}>Quản lý</Link></Menu.Item>
                    <Menu.Item   key={GUIDE}><Link to={GUIDE}>Hướng dẫn</Link></Menu.Item>
                </Menu>
            </div>}

            extra={[
                <Dropdown overlay={AvatarDropdownMenu} placement="bottomLeft">
                    <Avatar key="5" size={48} icon={<UserOutlined />} />
                </Dropdown>
            ]}
        ></PageHeader>
    )
}


const mapStateToProps = state => {
    return {
        itemSelected: state.headerMenu.itemSelected
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectHome: ()=> dispatch(selectHome()),
        selectBookManagement: ()=> dispatch(selectBookManagement()),
        selectGuide: ()=> dispatch(selectGuide())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)