import React from 'react'
import { Space, Row, Col, Image } from 'antd'
const Book = props => {
    const { name, author, publishTime, borrowTime, expireTime, img } = props.bookInfo
    return (

        <Row align="middle" gutter={[24,8]} style={{border:"0.2px solid #ccc"}} >
            <Col span={1} >
                {props.index}
            </Col>

            <Col span={2} >
                <Image
                    src={img}
                    height="100%"

                />
            </Col >

            <Col span={7} >
                <div style={{ fontSize: 18 }} >{name}</div>
            </Col>

            <Col span={8} >
                <div>Tác giả: {author}</div>
                <div>Năm xuất bản: {publishTime}</div>
            </Col>
            <Col span={3} >

              {borrowTime}
            </Col>
            <Col span={3} >
                {expireTime}
            </Col>

        </Row>
    )
}
export default Book