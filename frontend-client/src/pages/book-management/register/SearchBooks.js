import React, { Fragment, useState } from 'react'
import {Button, Menu, Row, Card, Input, Select, Col, Layout, Pagination} from 'antd'
import Book from './Book'
const { Search } = Input
const { Option } = Select
const {Footer} = Layout
const SearchBooks = props => {
    const onSearch = (value) => {
        console.log(value)
    }
    const onChangePage = (page) => {

    }
    const searchResultEx = {
        img: 'https://statics.pancake.vn/web-media/e9/c6/b4/f3/8cb610dafded1452dcfc8792450e2926faef8389b1ed8cc8d767c3b5.jpg',
        name: "Aquamancascsacascasc",
        publishTime: 2019,
        author: "James Wan",
        category: "Van hoc",
        isRegistered: false
    }
    return (
        <Fragment>
            <Card bordered={false}>
                
                <Row justify="start" gutter={4}>
                    <Col span={12}>
                    <Search  placeholder="Tên sách...    " onSearch={onSearch} enterButton style={{borderWidth: 2}} />
                    </Col>
                    <Col span={4} >
                        <Select placeholder="Năm xuất bản" style={{width:'100%'}}>
                            <Option value="2019">2019</Option>
                            <Option value="2019">2019</Option>
                            <Option value="2019">2019</Option>
                            <Option value="2019">2019</Option>
                            <Option value="2019">2019</Option>
                        </Select>
                    </Col>
                    <Col span={4}>
                        <Select placeholder="Tác giả" style={{width:'100%'}} >
                            <Option value="2019">2019</Option>
                            <Option value="2019">2019</Option>
                            <Option value="2019">2019</Option>
                            <Option value="2019">2019</Option>
                            <Option value="2019">2019</Option>
                        </Select>
                    </Col>

                    <Col span={4} >
                        <Select placeholder="Thể loại" style={{width:'100%'}}>
                            <Option value="2019">2019</Option>
                            <Option value="2019">2019</Option>
                            <Option value="2019">2019</Option>
                            <Option value="2019">2019</Option>
                            <Option value="2019">2019</Option>
                        </Select>

                    </Col>
                </Row>
            </Card>
            <Book bookInfo={searchResultEx}/>
            <Book bookInfo={searchResultEx}/>
            <Book bookInfo={searchResultEx}/>
            <Book bookInfo={searchResultEx}/>
            <Layout>
                <Footer style={{backgroundColor:"#fff"}}>
                <Pagination defaultCurrent={1} total={25} defaultPageSize={5} pageSize={5} onChange={onChangePage} style={{textAlign:'center'}}/>
                </Footer>
            </Layout>
        </Fragment>
    )
}

export default SearchBooks