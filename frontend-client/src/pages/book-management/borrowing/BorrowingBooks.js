import React, { Fragment, useEffect, useState } from 'react'
import {Row, Col, Pagination} from 'antd' 
import {useHistory, useLocation, useRouteMatch, useParams} from 'react-router-dom'
import BorrowingBookComponent from './BorrowingBookComponent'

import {getBorrowingBooks} from '../../../api/BookManagement'
import {useSelector} from 'react-redux'


const BorrowingBook = props => {
    const [bookInfo, setBookInfo] = useState([]);
    const [expireTimes, setExpireTimes] = useState([])
    const [mount, setMount] = useState(false)
    const userData = useSelector((state => state.userDataReducer.userData))
    const onChangePage = async(page, pageSize)=> {
        await getPage(page)
    }
    const getPage = async(pageNumber) => {
        try {
            let res = await getBorrowingBooks(userData._id, pageNumber)
            setExpireTimes(res.data.expireTimes)
            setBookInfo(res.data.borrowBooks)
        }
        catch (error){
            console.log(error)
        }
    }
    useEffect(()=> {    
        if (!mount)
            getPage(1)
        return (() => setMount(true))
    }, [])

    return (
        <Fragment>
            <div style={{maxHeight:'100vh'}}>
            <h4>Sách đang mượn</h4>
            <Row align="middle" gutter={[24,8]} style={{border:"0.2px solid #ccc"}} >
            <Col span={1} >
                STT
            </Col>
            <Col span={2} >
                Mã sách
            </Col >
            <Col span={2} >
                Bìa sách
            </Col >

            <Col span={8} >
                Tên sách
            </Col>

            <Col span={5} >
                Tác giả                
            </Col>

            <Col span={4} >
               Hạn trả sách
               
            </Col>

        </Row>
            {bookInfo.length > 0 && bookInfo.map((info, index)=>(
                <BorrowingBookComponent key={index} index={index} bookInfo={info} expireTime={expireTimes[index]}/>
            ))}
        </div>
        
        <div style={{width:'100%', textAlign:'center', marginTop:20}}>
            <Pagination defaultCurrent={1} total={25} defaultPageSize={5} pageSize={5} onChange={onChangePage}/>
        </div>
        </Fragment>
    )
}

export default BorrowingBook