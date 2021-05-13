import React, { Fragment, useState } from 'react'
import {Modal , Row, Col, Image, Button, DatePicker } from 'antd'
import {FieldTimeOutlined} from '@ant-design/icons'
import {ConfigProvider} from 'antd'
import vi_VN from 'antd/lib/locale/vi_VN'

const Book = props => {
    const { name, author, publishTime, borrowTime, expireTime, img } = props.bookInfo
    const [showModal, setShowModal] = useState(false)
    const onCancel = ()=> {
        setShowModal(false)
    }
    const handleAdjourn = ()=>{
        console.log("gia han")
    }
    return (

        <Fragment>
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

            <Col span={6} >
                <div style={{ fontSize: 18 }} >{name}</div>
            </Col>

            <Col span={6} >
                <div>Tác giả: {author}</div>
                <div>Năm xuất bản: {publishTime}</div>
            </Col>
            <Col span={3} >

              {borrowTime}
            </Col>

            <Col span={6} style={{textAlign:'center'}} >
                <p style={{marginRight:5}}>{expireTime}</p> 
                <Button 
                    onClick={()=>setShowModal(true)}
                    type="primary"
                    icon={<FieldTimeOutlined/>}  
                >Gia hạn
                </Button>
            </Col>

        </Row>
        <ConfigProvider locale={vi_VN}>
        <Modal
            visible={showModal}
            onCancel={onCancel}
            title={`Gia hạn sách ${name}`}
            onOk={handleAdjourn}
        >
            <DatePicker  picker="date" locale />
        </Modal>
        </ConfigProvider>
        </Fragment>
    )
}
export default Book