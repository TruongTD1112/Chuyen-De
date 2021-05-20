import React, { useState } from 'react'
import BaseLayout from '../../components/BaseLayout'
import { Progress, Form, Input, Row, Col, Button } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'
const EditProfile = (props) => {
    const [percentName, setPercentName] = useState(0)
    const [percentPass, setPercentPass] = useState(0)
    const handleChange = (values) => {

    }
    const handleChangePassword = (values)=> {

    }
    return (
        <BaseLayout>
            <div >
                

            </div>
            <Row justify="space-around">
                <Col >
                <Progress showInfo={false} status={percentName == 100 ? "success" : "active"} percent={percentName} />
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={handleChange}
                        style={{ width: 300 }}

                    >
                        <h2 style={{ textAlign: 'center' }}>Sửa thông tin</h2>
                        <Form.Item
                            name="fullName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Nhập tên mới!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} autoComplete="off" placeholder="Tên mới" />
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
                        <Form.Item style={{textAlign:'center'}}>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Lưu thay đổi
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>

                <Col >
                <Progress showInfo={false} status={percentPass == 100 ? "success" : "active"} percent={percentPass} />
                <Form
                        name="change_password"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={handleChangePassword}
                        style={{ width: 300 }}

                    >
                        <h2 style={{ textAlign: 'center' }}>Đổi mật khẩu</h2>
                        <Form.Item
                            name="oldPassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Mật khẩu cũ',
                                },
                            ]}
                        >
                            <Input type="password" prefix={<UserOutlined className="site-form-item-icon" />} autoComplete="off" placeholder="Mật khẩu cũ" />
                        </Form.Item>
                        <Form.Item
                            name="newPassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Nhập mật khẩu mới!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Mật khẩu mới"
                            />
                        </Form.Item>
                        <Form.Item style={{textAlign:'center'}}>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Lưu thay đổi
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </BaseLayout>
    )
}

export default EditProfile