import React from 'react';
import {Form, Input, Button,  notification} from 'antd';
import userApi from '../../api/userApi';
function SignUp() {
    
        const [form] = Form.useForm();
        const formItemLayout = {
            labelCol: {
              span: 8,
            },
            wrapperCol: {
              span: 10,
            },
          };
          const tailLayout = {
            wrapperCol: {
              offset: 11,
              span: 20,
            },
          };
        
        const validate = (data) => {
            data = form.getFieldsValue(['email', 'password', 'confirmPassword', 'firstName', 'lastName', 'birthday', 'class']);
            try{
                if (data.email === "" || data.password === "" || data.confirmPassword === "" || data.firstName === ""
                        || data.lastName === "" || data.birthday === undefined || data.class === "") {
                    notification.error({message : "Vui lòng nhập đầy đủ thông tin các trường"});
                }
                else if (data.password.length < 8 || data.confirmPassword.length < 8) {
                    notification.error({message : "Mật khẩu phải có tối thiểu 8 kí tự"})
                }
                else if (data.password !== data.confirmPassword) {
                    notification.error({message : "Mật khẩu và nhập lại mật khẩu phải trùng nhau"})
                }
                else {
                    getData()
                }
            }
            catch(err){
                notification.error({message : err.message});
            }
        }
        const getData = async () => {
            try{
                var data = form.getFieldsValue(['email', 'password', 'confirmPassword', 'firstName', 'lastName', 'birthday', 'class']);
                await userApi.signUp(data);
                form.resetFields(['email', 'password', 'confirmPassword', 'firstName', 'lastName', 'birthday', 'class']);
            }
            catch(err){
                console.log(err);
            }
        }
        
        const cancel = () => {
            form.resetFields(['email', 'password', 'confirmPassword', 'firstName', 'lastName', 'birthday', 'class']);
        }

        return (
            <Form 
                layout = 'horizontal' 
                form = {form}
                initialValues = {{
                    layout: 'horizontal'
                }}
            >
                <Form.Item>
                    <h1 class="text-center">Đăng ký tài khoản</h1>
                </Form.Item>
                <Form.Item {...formItemLayout} label = "Email" name = "email"  
                    rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập email"
                            }
                        ]}
                >
                    <Input placeholder="VD. thanh.la170115@sis.hust.edu.vn" allowClear="true"/>                           
                </Form.Item>
    
                <Form.Item {...formItemLayout} label = "Mật khẩu" name = "password"
                    rules={[
                            ({ getFieldValue }) => ({
                                validator(rule, value = "") {
                                  if (value.length < 8) {
                                    return Promise.reject("Mật khẩu phải có tối thiểu 8 kí tự");
                                  } else {
                                    return Promise.resolve();
                                  }
                                }
                            }),
                            {
                                required: true,
                                message: "Vui lòng nhập mật khẩu"
                            }
                        ]}
                >
                    <Input type="password" placeholder="VD. 12345678" allowClear="true" required="required"/>                           
                </Form.Item>

                <Form.Item {...formItemLayout} label = "Nhập lại mật khẩu" name = "confirmPassword"
                    rules={[
                        ({ getFieldValue }) => ({
                            validator(rule, value = "") {
                              if (value.length < 8) {
                                return Promise.reject("Mật khẩu phải có tối thiểu 8 kí tự");
                              } else {
                                return Promise.resolve();
                              }
                            }
                        }),
                        {
                            required: true,
                            message: "Vui lòng nhập lại mật khẩu"
                        }
                    ]}
                >
                    <Input type="password" placeholder="VD. 12345678" allowClear="true"/>                           
                </Form.Item>
                
                <Form.Item {...formItemLayout} label = "Họ và tên đệm" name = "firstName"
                    rules={[{
                        required: true,
                        message: "Vui lòng nhập thông tin Họ và tên đệm"
                        }]}
                >
                    <Input placeholder="VD. Lê Anh" allowClear="true"/>                           
                </Form.Item>

                <Form.Item {...formItemLayout} label = "Tên" name = "lastName"
                    rules={[{
                        required: true,
                        message: "Vui lòng nhập thông tin Tên"
                        }]}
                >
                    <Input placeholder="VD. Thành" allowClear="true"/>                           
                </Form.Item>
    
                <Form.Item {...formItemLayout} label = "Ngày sinh" name = "birthday"
                    rules={[{
                        required: true,
                        message: "Vui lòng chọn ngày"
                    }]}
                >
                    <Input type="date" allowClear="true"/>                          
                </Form.Item>

                <Form.Item {...formItemLayout} label = "Lớp" name = "class"
                    rules={[{
                        required: true,
                        message: "Vui lòng nhập thông tin lớp học"
                    }]}
                >
                    <Input placeholder="VD. KHMT-01" allowClear="true"/>                           
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type = "primary" onClick= {validate}>
                        Đăng ký
                    </Button>             
                    <Button htmlType="button" onClick = {cancel}>
                        Xóa thông tin
                    </Button>                 
                </Form.Item>
            </Form>
        );
    }

export default SignUp;