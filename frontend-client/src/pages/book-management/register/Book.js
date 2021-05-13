import React from 'react'
import {Row, Col, Button} from 'antd'
const Book = props => {
    const {author, genre, title, _id, code} = props.bookInfo
    let isRegistered = false;
    return(
        <Row style={{marginBottom:6, border:'0.2px solid #ddd'}} gutter={[24,12 ]} align="middle">
            <Col span={2}>
                <img src={"https://statics.pancake.vn/web-media/e9/c6/b4/f3/8cb610dafded1452dcfc8792450e2926faef8389b1ed8cc8d767c3b5.jpg"} width="100%"/>
            </Col>

            <Col span={8}>
                {title}
            </Col>

            <Col span={4}>
                {genre}
            </Col>

            <Col span={4}>
                {author}
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