import React, {useEffect} from 'react'
import { Space, Row, Col, Image, Tooltip, Button } from 'antd'
import {handleExpireTime} from '../../../utils/handleExpireTime'
const Book = props => {
    const { title, author, code, genre } = props.bookInfo
    
    return (

        <Row align="middle" gutter={[24,8]} style={{border:"0.1px solid #ccc"}} >
            <Col span={1} >
                {props.index}
            </Col>
            <Col span={2} >
                {code}
            </Col>
            <Col span={2} >
                <Image
                style={{marginTop: 5}}
                    src={require('../../../assets/book-image/maclenin.jpg').default}
                    height="70%"
                />
            </Col >

            <Col span={8} >
                <div>{title}</div>
            </Col>

            <Col span={5} >
                {author}
                
            </Col>
            
            <Col span={4} >
                
                <Tooltip placement="bottom" title={"Còn " + handleExpireTime(props.expireTime).leftDays + " ngày nữa"}>
                    <Button>{handleExpireTime(props.expireTime).time}</Button>
                </Tooltip>
            </Col>

        </Row>
    )
}
export default Book