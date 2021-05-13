import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { Menu, PageHeader, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {
    BookOutlined,
    PicLeftOutlined,
    FieldTimeOutlined
} from '@ant-design/icons'
import {
    EXTEND,
    BORROWING,
    REGISTER_BORROW,
    selectExtend,
    selectBorrowing,
    selectRegisterBorrow
} from '../../redux/reducers/BookManagementMenuReducer'

const SideMenu = props => {

    const history = useHistory()
    const onSelect = ({key})=> {
        if (key === BORROWING) props.selectBorrowing()
        if (key === REGISTER_BORROW) props.selectRegisterBorrow()
        if (key === EXTEND) props.selectExtend()
    }
    const {url} = props
    useEffect(()=> {
        history.replace(url+props.itemSelected)
    }, [])
    return (
        <Menu onSelect={onSelect} selectedKeys={[props.itemSelected]} theme="dark" defaultSelectedKeys={[BORROWING]} style={{height:'100%',minHeight:'100vh' ,width:"100%", borderRightWidth: 2}}>
                <Menu.Item key={BORROWING} icon={<BookOutlined/>}>
                    <Link to={url + BORROWING}>Sách đang mượn</Link>
                </Menu.Item>
                <Menu.Item key={REGISTER_BORROW} icon={<PicLeftOutlined/>}>
                    <Link to={url + REGISTER_BORROW}>Đăng ký mượn sách</Link>
                </Menu.Item>
                <Menu.Item key={EXTEND} icon={<FieldTimeOutlined/>}>
                    <Link to={url + EXTEND}>Gia hạn</Link>
                </Menu.Item>
        </Menu>
    )
}

const mapStateToProps = state => {
    return {
        itemSelected: state.bookManagementReducer.itemSelected
    }
}
const mapDispatchToProps = dispatch => {
    return {
        selectExtend: ()=>dispatch(selectExtend()),
        selectBorrowing: ()=> dispatch(selectBorrowing()),
        selectRegisterBorrow: ()=> dispatch(selectRegisterBorrow())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SideMenu)
// export default SideMenu