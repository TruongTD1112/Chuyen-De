import React from 'react'
import {Link, useHistory} from 'react-router-dom'
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {login} from '../../api/Login_Logout'
const Login = (props) => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    const history = useHistory()
    const log  = async (values)=> {
        // const res = await login(values.username, values.password)
        // console.log(res)
        history.push('/client/home')
    }

    return (
        <Row style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', height:'100vh'}}>
            <Col span={6}>
            <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={log}
            style={{width:300}}
            
        >
            <h2 style={{textAlign:'center'}}>Đăng nhập</h2>
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Nhập tên đăng nhập!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Tên đăng nhập" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Nhập mật khẩu!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Mật khẩu"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Nhớ tài khoản</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                    Quên mật khẩu
        </a>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Đăng nhập
        </Button>
        Hoặc <Link to={`/client/signup`}>Đăng ký tài khoản mới!</Link>
            </Form.Item>
        </Form>
            </Col>
        </Row>
    );
};

export default Login