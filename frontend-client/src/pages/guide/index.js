import React from 'react'
import BaseLayout from '../../components/BaseLayout'
import {Button, Timeline} from 'antd'
const Guide = props => {
    return (
        <BaseLayout>
            
            <div style={{textAlign: 'center', margin:'auto', width:'80vw'}}>
            <h2>Hướng dẫn đăng ký mượn sách</h2>
            <br></br>
            <Timeline>
                <Timeline.Item color="green"><Button style={{width: 500, textAlign:'left'}}>Tìm kiếm sách</Button></Timeline.Item>
                <Timeline.Item color="green"><Button style={{width: 500, textAlign:'left'}}>Thêm vào mục sách yêu thích</Button></Timeline.Item>
                <Timeline.Item color="green"><Button style={{width: 500, textAlign:'left'}}>Đăng ký mượn sách trong mục sách yêu thích hoặc tìm kiếm</Button></Timeline.Item>
                <Timeline.Item color="green"><Button style={{width: 500, textAlign:'left'}}>Đến thư viện nhận sách</Button></Timeline.Item>
            </Timeline>
            </div>
        </BaseLayout>
    )
}

export default Guide