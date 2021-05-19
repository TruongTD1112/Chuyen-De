import React, {useState, useEffect} from 'react'
import {Row, Col, Button} from 'antd'
import {unregisterBorrow, registerBorrow} from '../../../api/BookManagement'
import {useSelector} from 'react-redux'
import { openErrorNotificaton, openSuccessNotification, openWarningNotification } from '../../../utils/notification'
const Book = props => {
    const {author, genre, title, _id, code} = props.bookInfo
    let [isRegistered, setIsRegistered] = useState(false);
    let [regisLoading, setRegisLoading] = useState(false);
    let [unregisLoading, setUnregisLoading] = useState(false);
    let registeredBooks = useSelector((state) => state.registeredBooksReducer.registeredBooks)
 
    let onUnregisterBorrow = async() => {
        try{
            setUnregisLoading(true);
            let book = registeredBooks.filter((b => b.code === code))[0]        
            let unregisSuccess = await unregisterBorrow(props.userId, code ,book.bookElementId)
            if (unregisSuccess.status === 200){
                props.setRegisteredBooks(unregisSuccess.data.registerBooks)
                openSuccessNotification("Thành công", "Đã hủy đăng ký mượn sách ")
                setIsRegistered(false)
            }
            setUnregisLoading(false)
        }catch(err){

            openErrorNotificaton("Có lỗi xảy ra")
            setUnregisLoading(false)
        }
    }

    const onRegisterBorrow = async () => {        
        setRegisLoading(true);
        try{
            let res = await registerBorrow(props.userId, code);
            if (res.status === 200 && res.data.registerBook !== undefined){
                openSuccessNotification("Thành công", "Đăng ký mượn thành công, hãy đến thư viện để nhận sách")
                props.addToRegistered(res.data.registerBook)

                setIsRegistered(true);
            }
            else {
                openWarningNotification("Hết sách", "Hiện tại trong thư viện sách này đã được mượn hết")
            }
            setRegisLoading(false);
        }catch (err){
            console.log(err)
            openErrorNotificaton("Có lỗi xảy ra")
            setRegisLoading(false);
        }
    }
    useEffect(()=> {

        setIsRegistered(registeredBooks.some(book => book.code === code))

    },[_id])
    return(
        <Row style={{marginBottom:6, border:'0.2px solid #ddd'}} gutter={[24,12 ]} align="middle">
            <Col span={2}>
                {code}
            </Col>
            <Col span={2}>
                <img src={"https://statics.pancake.vn/web-media/e9/c6/b4/f3/8cb610dafded1452dcfc8792450e2926faef8389b1ed8cc8d767c3b5.jpg"} width="100%"/>
            </Col>

            <Col span={6}>
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
                    <Button loading={unregisLoading} onClick={onUnregisterBorrow} type="primary" danger>Hủy đăng ký</Button>
                }
                {!isRegistered &&
                    <Button loading={regisLoading} onClick={onRegisterBorrow} type="primary">Đăng ký mượn</Button>
                }
            </Col>
        </Row>
    )
}
export default Book