import React from 'react'
import {Row, Col, Button} from 'antd'
const Book = props => {
    const {img, name, category, author, publishTime, isRegistered} = props.bookInfo
    return(
        <Row style={{marginBottom:6, border:'0.2px solid #ddd'}} gutter={[24,12 ]} align="middle">
            <Col span={2}>
                <img src={img} width="100%"/>
            </Col>

            <Col span={8}>
                {name}
            </Col>

            <Col span={4}>
                {category}
            </Col>

            <Col span={4}>
                {author}
            </Col>

            <Col span={2}>
                {publishTime}
            </Col>
            <Col span={4}>
                {isRegistered && 
                    <Button type="primary" danger>Hủy đăng ký</Button>
                }
                {!isRegistered &&
                    <Button type="primary">Đăng ký mượn</Button>
                }
            </Col>
        </Row>
    )
}
export default Book