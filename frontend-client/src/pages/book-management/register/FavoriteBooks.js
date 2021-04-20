import React, { Fragment, useState, useEffect } from 'react'
import {Pagination, Layout, Spin} from 'antd'
import {LoadingOutlined} from '@ant-design/icons'
import Book from './Book'

const {Footer} = Layout
const loadIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
const FavoriteBooks = props => {
    const searchResultEx = {
        img: 'https://statics.pancake.vn/web-media/e9/c6/b4/f3/8cb610dafded1452dcfc8792450e2926faef8389b1ed8cc8d767c3b5.jpg',
        name: "Aquamancascsacascasc",
        publishTime: 2019,
        author: "James Wan",
        category: "Van hoc",
        isRegistered: true
    }
    const [isLoading, setIsLoading] = useState(false)
    const onChange = (page)=> {
        console.log(page)
    }
    
    return (
        <Fragment>
            <br/>
            <div style={{width:'100%',    textAlign:'center'}}>
                <Book bookInfo={searchResultEx}/>
                <Book bookInfo={searchResultEx}/>
                <Book bookInfo={searchResultEx}/>
                <Book bookInfo={searchResultEx}/>
                <br/>
                {loadIcon}
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