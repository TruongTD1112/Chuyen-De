import React from 'react'
import {Button} from 'antd'
import {Link} from 'react-router-dom'
const Index = props => {
    return (
        <div style={{width:'100vw', height:'100vh', display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
            <Link to="/client/login"><Button type="primary">Đăng nhập</Button></Link>
        </div>
    )
}

export default Index