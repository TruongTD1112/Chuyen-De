import React, {useState} from 'react'
import { Space, Card, Drawer, Row, Col, Button, Tooltip } from 'antd'
import {ReadOutlined } from '@ant-design/icons'
import BookDetailComponent from './BookDetailComponent'
const { Meta } = Card
const BookComponent = props => {
    const { title, author, genre, code , _id} = props.bookInfo
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
                        src={'https://statics.pancake.vn/web-media/e9/c6/b4/f3/8cb610dafded1452dcfc8792450e2926faef8389b1ed8cc8d767c3b5.jpg'}
                    />
                }
            >
                <Meta
                    title={title}
                    description={code + ' - ' + author + ' - ' + genre}
                />

            </Card>
            <BookDetailComponent
                author={author}
                name={title}
                code={code}
                genre={genre}
                detailVisible={detailVisible}
                onCloseDetail={onCloseDetail}
                _id = {_id}
                img={"https://statics.pancake.vn/web-media/e9/c6/b4/f3/8cb610dafded1452dcfc8792450e2926faef8389b1ed8cc8d767c3b5.jpg"}
            />
        </Col>
    )
}
export default BookComponent
