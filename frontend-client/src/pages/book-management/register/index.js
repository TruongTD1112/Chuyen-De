import React, { Fragment, useState, useEffect } from 'react'
import {Button, Menu, Row} from 'antd'
import SearchBooks from './SearchBooks'
import FavoriteBooks from './FavoriteBooks'
import {connect} from 'react-redux'
import {addToRegistered,removeFromRegistered, setRegisteredBooks} from '../../../redux/reducers/RegisteredBookReducer'
import {getRegisteredBooks} from '../../../api/BookManagement'
import {openErrorNotificaton} from '../../../utils/notification'

const RegisterBook = props => {
    const [option, setOption] = useState('');
    const getRgisteredBook = async () => {
        try {
            let res = await getRegisteredBooks(props.userData._id)
            if (res.status === 200) {
               console.log(props.registeredBooks)
               props.setRegisteredBooks(res.data)
            }
            else {
                openErrorNotificaton("Có lỗi khi tải trang")
                return
            }
        } catch (error) {
            openErrorNotificaton("Có lỗi khi tải trang")
        }
    }
    useEffect(()=> {
        getRgisteredBook()
    }, [])
    return (
        <Fragment>
            <Row style={{marginBottom:10}} justify="end" >
                <Button  style={{width:150}} onClick={()=>setOption("favorite")} type={option=="favorite"?"primary":"default"} >Sách yêu thích</Button>               
            </Row>
            <Row justify="end" >                
                <Button  style={{width:150}} onClick={()=>setOption("search")} type={option=="search"?"primary":"default"}>Tìm kiếm</Button>
            </Row>
            {option === "search" && 
                <SearchBooks 
                    addToRegistered={props.addToRegistered} 
                    removeFromRegistered={props.removeFromRegistered} 
                    registeredBooks={props.registeredBooks} 
                    userData={props.userData}/>}
            {option === "favorite" && 
                <FavoriteBooks 
                    registeredBooks={props.registeredBooks} 
                    addToRegistered={props.addToRegistered} 
                    removeFromRegistered={props.removeFromRegistered} 
                    userData={props.userData}/>}
        </Fragment>
    )
}
//map state store in redux to props
const mapStateToProps = state => {
    return {
        userData: state.userDataReducer.userData,
        registeredBooks: state.registeredBooksReducer.registeredBooks
    }
}
//map action to props
const mapDispatchToProps = dispatch => {
    return {
        addToRegistered: (payload) => dispatch(addToRegistered(payload)),
        removeFromRegistered: (payload) => dispatch(removeFromRegistered(payload)),
        setRegisteredBooks: (payload) => dispatch(setRegisteredBooks(payload))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterBook)
