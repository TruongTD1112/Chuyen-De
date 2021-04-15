import React from 'react'
import { Space, Card } from 'antd'
import {BorderlessTableOutlined, UserOutlined, FieldTimeOutlined} from '@ant-design/icons'
const { Meta } = Card
const BookComponent = props => {
    const { name, img, author, publishTime } = props.bookInfo
    return (
        <Card
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
                description={author+' - '+publishTime}             
            />
           
        </Card>
    )
}
export default BookComponent
