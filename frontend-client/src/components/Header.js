import React, { useState, useEffect } from 'react'
import { Menu, PageHeader, Avatar, Dropdown, Button} from 'antd';
import { UserOutlined } from '@ant-design/icons'
import {connect, useDispatch} from 'react-redux'
import {useHistory, Link} from 'react-router-dom'

import {
    selectHome, 
    selectBookManagement, 
    selectGuide,
    HOME,
    BOOK_MANAGEMENT,
    GUIDE
} from '../redux/reducers/MenuReducer'
import { setData } from '../redux/reducers/UserDataReducer';
import {getCookieByName} from '../utils/cookieHandler'
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
        if (props.userData._id == ""){
            let temp = props.userData;
            temp._id = getCookieByName('u_id');
            temp.firstName = getCookieByName('Name');
            props.setUserData(temp)
        }
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
                <label key="1" style={{fontWeight:'bold'}} >{props.userData.firstName == "" ? getCookieByName('Name'): props.userData.firstName}</label>,
                <Dropdown key="2" overlay={AvatarDropdownMenu} placement="bottomLeft">
                    <Avatar key="5" style={{ backgroundColor: '#87d068' }} size={40} icon={<UserOutlined  />} />
                </Dropdown>
            ]}
        ></PageHeader>
    )
}

//map state store in redux to props
const mapStateToProps = state => {
    return {
        itemSelected: state.headerMenu.itemSelected,
        userData: state.userDataReducer.userData
    }
}
//map action to props
const mapDispatchToProps = dispatch => {
    return {
        selectHome: ()=> dispatch(selectHome()),
        selectBookManagement: ()=> dispatch(selectBookManagement()),
        selectGuide: ()=> dispatch(selectGuide()),
        setUserData: (data)=> dispatch(setData(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)