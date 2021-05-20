import React, {useState} from 'react'
import { Space, Card, Drawer, Row, Col, Button, Tooltip, notification } from 'antd'
import {ReadOutlined, HeartOutlined } from '@ant-design/icons'
import {connect} from 'react-redux'
import {addBookToFavorite} from '../../api/BookManagement'
import {openErrorNotificaton, openSuccessNotification, openWarningNotification} from '../../utils/notification'
const BookDetailComponent = (props)=>{
    const {detailVisible, onCloseDetail, img, author, code, genre, name, _id} = props
    const [isAddingToFav, setIsAddingToFav] = useState(false);
    const onAddToFavorite = async () => {
        setIsAddingToFav(true);
        try{
            
            let res = await addBookToFavorite(props.userData._id, _id);
            if (res.status === 200){
                openSuccessNotification("Thành công", "Đã thêm sách vào mục yêu thích");
            }
            if (res.status === 400){
                openErrorNotificaton("Thất bại", "Đã có lỗi xảy ra")
            }
        }catch(err){
            openErrorNotificaton("Thất bại", "Đã có lỗi xảy ra")
        }
    }
    return (
        <Drawer
                width={window.innerWidth<=375 ? "100%": "50%"}
                height ={window.innerWidth<=375 ? "80%": "100%"}
                placement={window.innerWidth <= 375 ? "bottom": "right"}
                visible={detailVisible}
                onClose={onCloseDetail}
                closable={false}
            >
                
                <Row>
                    <Col span={24}>
                        <img src={img} width={"100%"}/>
                    </Col>
                </Row>
                <br/>   
                <h2>{name}</h2>
                <Row>
                    <Col span={8}>
                        <h4>Mã sách: {code}</h4>
                    </Col>
                    <Col span={8}>
                        <h4>Tác giả: {author}</h4>
                    </Col>
                    <Col span={8}>
                        <h4>Thể loại: {genre}</h4>
                    </Col>

                </Row>
                <br/>
                <div>
                    Giới thiệu sách: abcxyz
                </div>
                <br/>
                <Tooltip title="Đọc thử 10 trang đầu">
                    <Button shape="circle" icon={<ReadOutlined />}/>
                </Tooltip>
                <Tooltip title="Thêm vào mục yêu thích">
                    <Button onClick={onAddToFavorite} shape="circle" style={{border:'1px solid red', marginLeft: 10}} icon={<HeartOutlined style={{color:'red'}} />}/>
                </Tooltip>
                

            </Drawer>
    )
}
//map state store in redux to props
const mapStateToProps = state => {
    return {
        userData: state.userDataReducer.userData
    }
}
//map action to props
const mapDispatchToProps = dispatch => {
    return {
        
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BookDetailComponent)
