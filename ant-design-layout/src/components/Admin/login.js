import React from 'react';
import {Form, Input, Button,  notification} from 'antd';
import adminApi from '../../api/adminApi';
function Login({login}) {
    
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
            data = form.getFieldsValue(['email', 'password']);
            try{
                if (data.email === "" || data.password === "") {
                    notification.error({message : "Vui lòng nhập đầy đủ thông tin các trường"});
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
                var data = form.getFieldsValue(['email', 'password']);
                const response = await adminApi.login(data);
                var email = response.email;
                var name = response.firstName + " " + response.lastName;
                document.cookie = `Email=${email}`;
                document.cookie = `Name=${name}`;
                login();
            }
            catch(err){
                console.log(err);
            }
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
                    <h1 class="text-center">Đăng nhập tài khoản quản trị</h1>
                </Form.Item>
                <Form.Item {...formItemLayout} label = "Email" name = "email"  
                    rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập email"
                            }
                        ]}
                >
                    <Input placeholder="VD. point.life@hust.edu.vn" allowClear="true"/>                           
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

                <Form.Item {...tailLayout}>
                    <Button type = "primary" onClick= {() => {validate()}}>
                        Đăng nhập
                    </Button>                            
                </Form.Item>
            </Form>
        );
    }

export default Login;