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
            <h3>Sách yêu thích</h3><br/>
            <Carousel afterChange={onChange} autoplay={true} style={{width:'100%'}}>
            {bookList.map((value, index) => (
                <div key={index}>
                    <Row justify="space-around" >
                        <Col span={5}>
                            <img src="https://www.world-archaeology.com/wp-content/uploads/cwa55/400px/1267.jpg" width="100%" height="100%" />
                        </Col>
                        <Col span={5}>
                            <img src="https://images-na.ssl-images-amazon.com/images/I/51fyLF1C-uL._SX329_BO1,204,203,200_.jpg" width="100%" height="100%"/>
                        </Col>
                        <Col span={5}>
                            <img src="https://www.world-archaeology.com/wp-content/uploads/cwa55/400px/1267.jpg" width="100%" height="100%"/>
                        </Col>
                        <Col span={5}>
                            <img src="https://images-na.ssl-images-amazon.com/images/I/41RvyEbLUFL._SX311_BO1,204,203,200_.jpg" width="100%" height="100%"/>
                        </Col>

                    </Row>
                </div>
            ))}
        </Carousel>
        </Fragment>
    )
}

export default Slide;

