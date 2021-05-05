import React, { Fragment, useState } from 'react'
import {Button, Menu, Row} from 'antd'
import SearchBooks from './SearchBooks'
import FavoriteBooks from './FavoriteBooks'

const BorrowingBook = props => {
    const [option, setOption] = useState('');
    
    return (
        <Fragment>
            <Row style={{marginBottom:10}} justify="end" >
                <Button  style={{width:150}} onClick={()=>setOption("favorite")} type={option=="favorite"?"primary":"default"} >Sách yêu thích</Button>               
            </Row>
            <Row justify="end" >                
                <Button  style={{width:150}} onClick={()=>setOption("search")} type={option=="search"?"primary":"default"}>Tìm kiếm</Button>
            </Row>
            {option === "search" && <SearchBooks/>}
            {option === "favorite" && <FavoriteBooks/>}
        </Fragment>
    )
}

export default BorrowingBook