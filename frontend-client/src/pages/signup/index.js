import React from 'react'
import {Link} from 'react-router-dom'
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {singup} from '../../api/Login_Logout'

const SignUp = props => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    const log  = async (values)=> {
        const res = await singup(values.username, values.password, values.fullName, values.email)
        console.log(res)
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
            <h2 style={{textAlign:'center'}}>Đăng ký tài khoản</h2>
            <Form.Item
                name="fullName"
                rules={[
                    {
                        required: true,
                        message: 'Nhập tên!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Tên" />
            </Form.Item>
            <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Nhập email!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" type="email" />
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
                    placeholder="Nhập lại mật khẩu"
                />
            </Form.Item>
            <Form.Item
                name="confirmPassword"
                rules={[
                    {
                        required: true,
                        message: 'Nhập lại mật khẩu!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Xác nhận mật khẩu"
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
                    Đăng ký
        </Button>
        Hoặc <Link to="/client/login">Đăng nhập</Link>
            </Form.Item>
        </Form>
            </Col>
        </Row>
    );
}

export default SignUp