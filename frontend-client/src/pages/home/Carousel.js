import React, { useState, useEffect, Fragment } from 'react'

import { Carousel, Row, Col } from 'antd';

import 'antd/dist/antd.css'
import './Carousel.css'
function onChange() {

}

const Slide = props => {
    const [bookList, setBookList] = useState([1, 2, 3, 4])
    const getBookList = async () => {
        //call Api

    }
    useEffect(() => {
        getBookList();
    }, [])
    return (
        <Fragment>
            <h3>Sách được mượn nhiều nhất</h3><br/>
            <Carousel afterChange={onChange} autoplay={true} style={{width:'100%'}}>
            {bookList.map((value, index) => (
                <div key={index}>
                    <Row justify="space-around" >
                        <Col span={5}>
                            <img src={require('../../assets/book-image/de-men-phieu-luu-ky.jpg').default} width="100%" height="100%" />
                        </Col>
                        <Col span={5}>
                            <img src={require('../../assets/book-image/maclenin.jpg').default} width="100%" height="100%"/>
                        </Col>
                        <Col span={5}>
                            <img src={require('../../assets/book-image/tinhocdaicuong.jpg').default} width="100%" height="100%"/>
                        </Col>
                        <Col span={5}>
                            <img src={require('../../assets/book-image/toancaocap.jpg').default} width="100%" height="100%"/>
                        </Col>

                    </Row>
                </div>
            ))}
        </Carousel>
        </Fragment>
    )
}

export default Slide;

