import React, { Fragment, useState, useEffect } from 'react'
import {Pagination, Layout, Spin} from 'antd'
import {LoadingOutlined} from '@ant-design/icons'
import Book from './Book'
import {getFavoriteBook, registerBorrow, unregisterBorrow} from '../../../api/BookManagement'
import {openErrorNotificaton, openSuccessNotification, openWarningNotification} from '../../../utils/notification'
const {Footer} = Layout
const loadIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
const FavoriteBooks = props => {

    const [listBooks, setListBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getFavBooks = async (p) => {
        try{
            setIsLoading(true)
            let res = await getFavoriteBook(props.userData._id, p)
            if (res.status === 200){
                setListBooks(res.data);
                console.log(res.data)
                setIsLoading(false);
            }
            else {
                openErrorNotificaton("Có lỗi khi tải trang")
                setIsLoading(false);
            }
        }catch(err){
            openErrorNotificaton("Có lỗi khi tải trang")
            setIsLoading(false);
        }
    }

    const onChange = (page)=> {
        getFavBooks(page);
    }
    useEffect(()=> {
        getFavBooks(1);
    }, [])
    
    return (
        <Fragment>
            <br/>
            <div style={{width:'100%',    textAlign:'center'}}>
                {listBooks.length > 0 && listBooks.map((elem, index) => (
                    <Book 
                    userId={props.userData._id} 
                    bookInfo = {elem} key={index} 
                    index={index}  
                    registeredBooks={props.registeredBooks}
                    addToRegistered={props.addToRegistered}
                    setRegisteredBooks = {props.setRegisteredBooks}   />
                ))}
                <br/>
                {isLoading && loadIcon}
            </div>
            
            {/* <div style={{width:'100%', textAlign:'center'}}> */}
            <Layout>
                <Footer style={{backgroundColor:"#fff"}}>
                    <Pagination defaultCurrent={1} total={25} defaultPageSize={5} pageSize={5} onChange={onChange} style={{textAlign:'center'}}/>
                </Footer>
            </Layout>
                
            {/* </div> */}
        </Fragment>
    )
}

export default FavoriteBooks