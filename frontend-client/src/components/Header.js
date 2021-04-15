import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { Menu, PageHeader, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'

import {
    selectHome, 
    selectBookManagement, 
    selectGuide,
    HOME,
    BOOK_MANAGEMENT,
    GUIDE
} from '../redux/reducers/MenuReducer'

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
                <Menu mode="horizontal" onSelect={onSelectMenuItem} selectedKeys={[props.itemSelected]} >
                    <Menu.Item key={HOME}><Link to="/client/home">Trang chủ</Link></Menu.Item>
                    <Menu.Item   key={BOOK_MANAGEMENT}><Link to="/client/book-management">Quản lý</Link></Menu.Item>
                    <Menu.Item   key={GUIDE}><Link to="/client/guide">Hướng dẫn</Link></Menu.Item>
                </Menu>
            </div>}

            extra={[
                <Avatar key="5" size={48} icon={<UserOutlined />} />
            ]}
        ></PageHeader>
    )
}


const mapStateToProps = state => {
    return {
        itemSelected: state.headerMenu.itemSelected,
        lastSelected: state.headerMenu.lastSelected
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