import React, { useEffect } from 'react';
import {Form, Input, Button,  notification} from 'antd';
import adminApi from '../../api/adminApi';
import {getCookieByName} from '../../utils/cookieHandler'
function ChangeInformationAdmin() {
    
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
              offset: 10,
              span: 20,
            },
          };
                

        const getDataAdmin = async(email) => {
            try{
                var admin = await adminApi.getInformationOfAdmin(email)
                form.setFieldsValue({'firstName' : admin.firstName});
                form.setFieldsValue({'lastName' : admin.lastName});
                form.setFieldsValue({'birthday' : admin.birthday});
            }
            catch(err){
                console.log(err);
            }
        }

        const changeInfo = async (data) => {
            var email = form.getFieldsValue(['email']);
            data = form.getFieldsValue(['firstName', 'lastName', 'birthday']);
            try{
                if (data.firstName === "" || data.lastName === "" || data.birthday === "") {
                    notification.error({message : "Vui lòng không để trống các trường cập nhật thông tin"});
                }
                else {
                    await adminApi.updateInformation(email, data);
                }
            }
            catch(err){
                console.log(err);
            }
        }

        const cancelInfo = () => {
            var email = form.getFieldsValue(['email']);
            getDataAdmin(email.email);
        }

        const changePassword = async (data) => {
            var email = form.getFieldsValue(['email']);
            data = form.getFieldsValue(['oldPassword', 'newPassword', 'confirmNewPassword']);
            console.log(data)
            try {
                if (data.oldPassword === "" || data.newPassword === "" || data.confirmNewPassword === "") {
                    notification.error({message : "Vui lòng nhập các trường mật khẩu ít nhất 8 kí tự."})
                }
                else {
                    await adminApi.changePassword(email, data);
                    cancelPassword();
                }
            } catch (err) {
                console.log(err);
            }
        }

        const cancelPassword = () => {
            form.resetFields(['oldPassword', 'newPassword', 'confirmNewPassword']);
        }

        useEffect(() => {
            var email = getCookieByName("Email");
            form.setFieldsValue({'email' : email});
            getDataAdmin(email);
        })

        return (
            <Form 
                layout = 'horizontal' 
                form = {form}
                initialValues = {{
                    layout: 'horizontal'
                }}
            >
                <Form.Item>
                    <h1 class="text-center">Thay đổi thông tin cá nhân</h1>
                </Form.Item>
                <Form.Item name="userSection">
                    <h2 class="text-center">Cập nhật thông tin</h2>
                </Form.Item>
                <Form.Item {...formItemLayout} label = "Email" name = "email"  
                    rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập email"
                            }
                        ]}
                >
                    <Input placeholder="VD. point.life@hust.edu.vn" allowClear="true" disabled={true}/>                           
                </Form.Item>
                
                <Form.Item {...formItemLayout} label = "Họ và tên đệm" name = "firstName"
                    rules={[{
                        required: true,
                        message: "Vui lòng nhập thông tin Họ và tên đệm"
                        }]}
                >
                    <Input placeholder="VD. Life" allowClear="true"/>                           
                </Form.Item>

                <Form.Item {...formItemLayout} label = "Tên" name = "lastName"
                    rules={[{
                        required: true,
                        message: "Vui lòng nhập thông tin Tên"
                        }]}
                >
                    <Input placeholder="VD. Point" allowClear="true"/>                           
                </Form.Item>
    
                <Form.Item {...formItemLayout} label = "Ngày sinh" name = "birthday"
                    rules={[{
                        required: true,
                        message: "Vui lòng chọn ngày"
                    }]}
                >
                    <Input type="date" placeholder="VD. 19-28-8754" allowClear="true"/>                          
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type = "primary" onClick= {changeInfo}>
                        Đổi thông tin
                    </Button>
                    <Button type = "danger" onClick= {cancelInfo}>
                        Xóa thông tin
                    </Button>                             
                </Form.Item>

                <Form.Item name="passwordSection">
                    <br></br>
                    <h2 class="text-center">Thay đổi mật khẩu</h2>
                </Form.Item>

                <Form.Item {...formItemLayout} label = "Mật khẩu cũ" name = "oldPassword"
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
                                message: "Vui lòng nhập mật khẩu cũ"
                            }
                        ]}
                >
                    <Input type="password" placeholder="VD. 12345678" allowClear="true" required="required"/>                           
                </Form.Item>

                <Form.Item {...formItemLayout} label = "Mật khẩu mới" name = "newPassword"
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
                                message: "Vui lòng nhập mật khẩu mới"
                            }
                        ]}
                >
                    <Input type="password" placeholder="VD. 12345678" allowClear="true" required="required"/>                           
                </Form.Item>

                <Form.Item {...formItemLayout} label = "Nhập lại mật khẩu mới" name = "confirmNewPassword"
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
                            message: "Vui lòng nhập lại mật khẩu mới"
                        }
                    ]}
                >
                    <Input type="password" placeholder="VD. 12345678" allowClear="true"/>                           
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type = "primary" onClick= {changePassword}>
                        Đổi mật khẩu
                    </Button>
                    <Button type = "danger" onClick= {cancelPassword}>
                        Xóa thông tin
                    </Button>                             
                </Form.Item>
            </Form>
        );
    }

export default ChangeInformationAdmin;