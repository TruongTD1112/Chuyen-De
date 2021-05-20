import React, { Fragment, useEffect } from 'react'
import {Row, Col, Pagination} from 'antd' 
import {useHistory, useLocation} from 'react-router-dom'
import ExtendBookComponent from './ExtendBookComponent'

const useQuery = ()=> {
    return new URLSearchParams(useLocation().search)
}

const AdjournBook = props => {
    const bookInfo = [{
        name: 'Math',
        author: 'Chien',
        publishTime: '2009',
        borrowTime: '12/3/2021',
        expireTime: '12/6/2021',
        img: 'https://newshop.vn/public/uploads/products/10697/thuy-hu-tap-2-pts.gif'
    },
    {
        name: 'Math',
        author: 'Chien',
        publishTime: '2009',
        borrowTime: '12/3/2021',
        expireTime: '12/6/2021',
        img: 'https://newshop.vn/public/uploads/products/10697/thuy-hu-tap-2-pts.gif'
    }]
    const history = useHistory()
    const query = useQuery()

    const onChangePage = (page, pageSize)=> {
        history.push(history.location.pathname+"?page="+page)
    }
    const getPage = async(pageNumber) => {
        console.log(pageNumber)
    }
    useEffect(()=> {
        let pageNumber = query.get("page")
        if (pageNumber == null) pageNumber = 1;
        getPage(pageNumber)
    },[history.location.search])

    return (
        <Fragment>
            <div style={{maxHeight:'100vh'}}>
            <h4>Sách đang mượn</h4>
            <Row align="middle" gutter={[24,8]} style={{border:"0.2px solid #ccc"}} >
            <Col span={1} >
                STT
            </Col>

            <Col span={2} >
                Bìa sách
            </Col >

            <Col span={6} >
                Tên sách
            </Col>

            <Col span={6} >
                Tác giả / năm xuất bản
                
            </Col>
            <Col span={3} >
                Ngày mượn

            </Col>
            <Col span={6} style={{textAlign:'center'}} >
               Hạn trả sách
               
            </Col>

        </Row>
            {bookInfo.map((info, index)=>(
                <ExtendBookComponent key={index} index={index} bookInfo={info}/>
            ))}
        </div>
        
        <div style={{width:'100%', textAlign:'center', marginTop:20}}>
            <Pagination defaultCurrent={1} total={25} defaultPageSize={5} pageSize={5} onChange={onChangePage}/>
        </div>
        </Fragment>
    )
}

export default AdjournBook