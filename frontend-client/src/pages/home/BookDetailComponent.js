import React, {useState} from 'react'
import { Space, Card, Drawer, Row, Col, Button, Tooltip } from 'antd'
import {ReadOutlined, HeartOutlined } from '@ant-design/icons'

const BookDetailComponent = (props)=>{
    const {detailVisible, onCloseDetail, img, author, publishTime, name} = props
    return (
        <Drawer
                width={window.innerWidth<=375 ? "100%": "50%"}
                height ={window.innerWidth<=375 ? "80%": "100%"}
                placement={window.innerWidth <= 375 ? "bottom": "right"}
                visible={detailVisible}
                onClose={onCloseDetail}
                closable={false}
            >
                
                <Row>
                    <Col span={24}>
                        <img src={img} width={"100%"}/>
                    </Col>
                </Row>
                <br/>   
                <h2>{name}</h2>
                <Row>
                    <Col span={12}>
                        <h4>Tác giả: {author}</h4>
                    </Col>
                    <Col span={12}>
                        <h4>Xuất bản: {publishTime}</h4>
                    </Col>
                </Row>
                <br/>
                <div>
                    Giới thiệu sách: abcxyz
                </div>
                <br/>
                <Tooltip title="Đọc thử 10 trang đầu">
                    <Button shape="circle" icon={<ReadOutlined />}/>
                </Tooltip>
                <Tooltip title="Thêm vào mục yêu thích">
                    <Button shape="circle" style={{border:'1px solid red', marginLeft: 10}} icon={<HeartOutlined style={{color:'red'}} />}/>
                </Tooltip>
                

            </Drawer>
    )
}

export default BookDetailComponent