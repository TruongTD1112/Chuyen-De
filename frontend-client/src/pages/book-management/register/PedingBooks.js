import React, { Fragment, useState, useEffect } from 'react'
import { Pagination, Layout, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import Book from './Book'
import { getListBooksInfor } from '../../../api/BookManagement'
import { openErrorNotificaton, openSuccessNotification, openWarningNotification } from '../../../utils/notification'
const { Footer } = Layout
const loadIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
const PendingBooks = props => {

    const [listBooks, setListBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getPendingBooks = async (page) => {
        
        try {
            setIsLoading(true)
            let bookIds = props.registeredBooks.map((elem, index) => elem.bookId)

            if ((page - 1) * 5 > bookIds.length) {
                setIsLoading(false)
                return;
            }
            bookIds = bookIds.slice((page - 1) * 5, Math.min(bookIds.length, page * 5))
            let res = await getListBooksInfor(bookIds)
            if (res.status === 200) {
                setListBooks(res.data)
                setIsLoading(false)
            }
        } catch (error) {
            openErrorNotificaton("Có lỗi xảy ra")
            setIsLoading(false)
        }
        
    }
    useEffect(() => {
        getPendingBooks(1);
    },[])
    const onChange = (p) => {
        getPendingBooks(p)
    }
    return (
        <Fragment>
            <br />
            <div style={{ width: '100%', textAlign: 'center' }}>
                {listBooks.length > 0 && listBooks.map((elem, index) => (
                    <Book
                        userId={props.userData._id}
                        bookInfo={elem} key={index}
                        index={index}
                        registeredBooks={props.registeredBooks}
                        addToRegistered={props.addToRegistered}
                        setRegisteredBooks={props.setRegisteredBooks} />
                ))}
                <br />
                {isLoading && loadIcon}
            </div>

            {/* <div style={{width:'100%', textAlign:'center'}}> */}
            <Layout>
                <Footer style={{ backgroundColor: "#fff" }}>
                    <Pagination defaultCurrent={1} total={25} defaultPageSize={5} pageSize={5} onChange={onChange} style={{ textAlign: 'center' }} />
                </Footer>
            </Layout>

            {/* </div> */}
        </Fragment>
    )
}

export default PendingBooks