import React, {Fragment, useEffect, useState} from 'react'
import {Row, Col, Image, Tooltip, Button, ConfigProvider, Modal, DatePicker } from 'antd'
import {handleExpireTime} from '../../../utils/handleExpireTime'
import vi_VN from 'antd/lib/locale/vi_VN'
import {FieldTimeOutlined, CheckOutlined} from '@ant-design/icons'
import  {openErrorNotificaton, openWarningNotification} from '../../../utils/notification'

import {extendBook} from '../../../api/BookManagement'
const Book = props => {
    const { title, author, code, genre } = props.bookInfo
    const [showModal, setShowModal] = useState(false)
    const [date, setDate] = useState(new Date())
    const [isValid, setIsValid] = useState(false)
    const [handling, setHandling] = useState(false)
    const [iconBtn, setIconBtn] = useState(<></>)
    const [expireTime, setExpireTime] = useState(props.expireTime)
    const onCancel = ()=> {
        setShowModal(false)
    }
    const handleExtend = async()=> {
        let icon = <CheckOutlined />
        setIconBtn(<></>)
        setHandling(true)
        try{
            let res = await extendBook(props.userId, props.bookElementId, date)
            if (res.status === 200){
                setExpireTime(date)
                setIconBtn(icon)
                setHandling(false)
                setShowModal(false)
            }
            else{
                openErrorNotificaton("Có lỗi xảy ra")
            }
            setHandling(false)
        }
        catch(error){
            setHandling(false)
            openErrorNotificaton("Có lỗi xảy ra")
        }
    }
    const onChangeDate = (date, dateString) => {
        try{
            let now = new Date();
            let extendDate = new Date(date._d)
            if (now >= extendDate){
                openWarningNotification("Vui lòng chọn 1 ngày hợp lệ")
                setIsValid(false)
            }else{
                setDate(date._d)
                setIsValid(true)
            }
        }catch(error){
            openWarningNotification("Vui lòng chọn 1 ngày hợp lệ")
        }
    }
    return (
        <Fragment>
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

            <Col span={4} >
                <div>{title}</div>
            </Col>

            <Col span={4} >
                {author}
                
            </Col>
            <Col span={4}>
                {genre}
            </Col>
            <Col span={4} >
                
                <Tooltip placement="bottom" title={"Còn " + handleExpireTime(props.expireTime).leftDays + " ngày nữa"}>
                    <Button>{handleExpireTime(expireTime).time}</Button>
                </Tooltip>
            </Col>
            <Col span={3} style={{textAlign:'center'}} >
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
                    title={`Gia hạn sách ${title}`}
                    okButtonProps={{disabled: !isValid, loading: handling, icon: iconBtn}}
                    onOk={handleExtend}
                >
                    <DatePicker  onChange={onChangeDate} picker="date" locale />
                </Modal>
                </ConfigProvider>
                </Fragment>
    )
}
export default Book