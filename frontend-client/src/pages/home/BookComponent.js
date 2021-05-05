import React, {useState} from 'react'
import { Space, Card, Drawer, Row, Col, Button, Tooltip } from 'antd'
import {ReadOutlined } from '@ant-design/icons'
import BookDetailComponent from './BookDetailComponent'
const { Meta } = Card
const BookComponent = props => {
    const { name, img, author, publishTime } = props.bookInfo
    const [detailVisible, setDetailVisible] = useState(false)
    const onCloseDetail = ()=>{
        setDetailVisible(false)
    }
    return (
        <Col span={4}>
            <Card
                onClick={()=>setDetailVisible(true)}
                hoverable
                cover={
                    <img
                        alt="Image"
                        src={img}
                    />
                }
            >
                <Meta
                    title={name}
                    description={author + ' - ' + publishTime}
                />

            </Card>
            <BookDetailComponent
                author={author}
                name={name}
                publishTime={publishTime}
                detailVisible={detailVisible}
                onCloseDetail={onCloseDetail}
                img={img}
            />
        </Col>
    )
}
export default BookComponent
