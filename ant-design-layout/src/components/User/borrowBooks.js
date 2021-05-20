// import React from 'react';
// import {Form, Input, Button,  notification, InputNumber} from 'antd';
// import adminApi from '../../api/adminApi';
// function BorrowBooks() {
    
//         const [form] = Form.useForm();
//         const formItemLayout = {
//             labelCol: {
//               span: 8,
//             },
//             wrapperCol: {
//               span: 10,
//             },
//           };
//           const tailLayout = {
//             wrapperCol: {
//               offset: 10,
//               span: 20,
//             },
//           };
                
//         const validate = async (data) => {
//             data = form.getFieldsValue(['email']);
//             try{
//                 if (data.email === "") {
//                     notification.error({message : "Vui lòng nhập email của tài khoản"});
//                 }
//                 else {
//                     var user = await adminApi.getInformationOfUser(data.email);
//                     getDataUser(user);
//                 }
//             }
//             catch(err){
//                 console.log(err);
//             }
//         }
//         const getDataUser = (user) => {
//             try{
//                 form.setFieldsValue({'firstName' : user.firstName});
//                 form.setFieldsValue({'lastName' : user.lastName});
//                 form.setFieldsValue({'birthday' : user.birthday});
//                 form.setFieldsValue({'class' : user.class});

//             }
//             catch(err){
//                 console.log(err);
//             }
//         }
//         const cancel = () => {
//             form.resetFields(['email', 'firstName', 'lastName', 'birthday', 'class']);
//         }

//         return (
//             <Form 
//                 layout = 'horizontal' 
//                 form = {form}
//                 initialValues = {{
//                     layout: 'horizontal'
//                 }}
//             >
//                 <Form.Item>
//                     <h1 class="text-center">Đăng ký mượn sách (Chưa hoàn thiện)</h1>
//                 </Form.Item>
//                 <Form.Item name="userSection">
//                     <h2 class="text-center">Thông tin cá nhân</h2>
//                 </Form.Item>
//                 <Form.Item {...formItemLayout} label = "Email" name = "email"  
//                     rules={[
//                             {
//                                 required: true,
//                                 message: "Vui lòng nhập email"
//                             }
//                         ]}
//                 >
//                     <Input placeholder="VD. thanh.la170115@sis.hust.edu.vn" allowClear="true"/>                           
//                 </Form.Item>
                
//                 <Form.Item {...formItemLayout} label = "Họ và tên đệm" name = "firstName"
//                     rules={[{
//                         required: true,
//                         message: "Vui lòng nhập thông tin Họ và tên đệm"
//                         }]}
//                 >
//                     <Input placeholder="VD. Lê Anh" disabled={true}/>                           
//                 </Form.Item>

//                 <Form.Item {...formItemLayout} label = "Tên" name = "lastName"
//                     rules={[{
//                         required: true,
//                         message: "Vui lòng nhập thông tin Tên"
//                         }]}
//                 >
//                     <Input placeholder="VD. Thành" disabled={true}/>                           
//                 </Form.Item>
    
//                 <Form.Item {...formItemLayout} label = "Ngày sinh" name = "birthday"
//                     rules={[{
//                         required: true,
//                         message: "Vui lòng chọn ngày"
//                     }]}
//                 >
//                     <Input placeholder="VD. 01-01-2000" disabled={true}/>                          
//                 </Form.Item>

//                 <Form.Item {...formItemLayout} label = "Lớp" name = "class"
//                     rules={[{
//                         required: true,
//                         message: "Vui lòng nhập thông tin lớp học"
//                     }]}
//                 >
//                     <Input placeholder="VD. KHMT-01" disabled={true}/>                           
//                 </Form.Item>

//                 <Form.Item {...tailLayout}>
//                     <Button type = "primary" onClick= {validate}>
//                         Kiểm tra thông tin
//                     </Button>
//                     <Button type = "danger" onClick= {cancel}>
//                         Xóa thông tin
//                     </Button>                             
//                 </Form.Item>

//                 <Form.Item name="bookSection">
//                     <br></br>
//                     <h2 class="text-center">Thông tin sách (Chưa hoàn thiện)</h2>
//                 </Form.Item>

//                 <Form.Item {...formItemLayout} label = "Tên sách" name = "title"
//                     rules={[
//                             {
//                                 required: true,
//                                 message: "Vui lòng nhập tên sách"
//                             }
//                         ]}
//                 >
//                     <Input placeholder="VD. Văn học" allowClear="true"/>                           
//                 </Form.Item>

//                 <Form.Item {...formItemLayout} label = "Tên giả" name = "author"  
//                     rules={[
//                             {
//                                 required: true,
//                                 message: "Vui lòng nhập tên tác giả"
//                             }
//                         ]}
//                 >
//                     <Input placeholder="VD. Trần Văn Kiên" allowClear="true"/>                           
//                 </Form.Item>

//                 <Form.Item {...formItemLayout} label = "Thể loại" name = "genre"  
//                     rules={[
//                             {
//                                 required: true,
//                                 message: "Vui lòng nhập thể loại sách"
//                             }
//                         ]}
//                 >
//                     <Input placeholder="VD. Đại cương" allowClear="true"/>                           
//                 </Form.Item>

//                 <Form.Item {...formItemLayout} label = "Số lượng" name = "amount"  
//                     rules={[
//                             {
//                                 required: true,
//                                 message: "Vui lòng nhập số lượng"
//                             }
//                         ]}
//                 >
//                     <InputNumber min={1} placeholder="VD. 100" allowClear="true"/>                           
//                 </Form.Item>

//                 <Form.Item {...formItemLayout} label = "Ngày mượn" name = "date"  
//                     rules={[
//                             {
//                                 required: true,
//                                 message: "Vui lòng nhập ngày mượn"
//                             }
//                         ]}
//                 >
//                     <Input type="date" placeholder="VD. 01-01-2000" allowClear="true"/>                           
//                 </Form.Item>

//                 <Form.Item {...tailLayout}>
//                     <Button type = "primary" onClick= {validate}>
//                         Mượn sách
//                     </Button>
//                     <Button type = "danger" onClick= {cancel}>
//                         Xóa thông tin
//                     </Button>                             
//                 </Form.Item>
//             </Form>
//         );
//     }

// export default BorrowBooks;

import React from "react";
import { Form, Button, Input, Divider,notification,InputNumber } from "antd";
import DynamicField from "./borrowBookField";
import "antd/dist/antd.css"
import adminApi from '../../api/adminApi';
import '../../App.css'
  
  function App() {
    const [form] = Form.useForm();
    var user;
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
          offset: 5,
          span: 14,
        },
      };

    const validate = async (data) => {
    data = form.getFieldsValue(['email']);
    try{
        if (data.email === "") {
            notification.error({message : "Vui lòng nhập email của tài khoản"});
        }
        else {
            user = await adminApi.getInformationOfUser(data.email);
            getDataUser(user);
        }
    }
    catch(err){
        console.log(err);
    }
    }
    const getDataUser = (user) => {
        try{
            form.setFieldsValue({'firstName' : user.firstName});
            form.setFieldsValue({'lastName' : user.lastName});
            form.setFieldsValue({'birthday' : user.birthday});
            form.setFieldsValue({'class' : user.class});

        }
        catch(err){
            console.log(err);
        }
    }
    const cancel = () => {
        form.resetFields(['email', 'firstName', 'lastName', 'birthday', 'class']);
    }
  
    function handleFinish(values) {
      console.log("VALUES", values);
      alert("Check console for values");
    }
    return (
      <div className="App">
            <Form 
                layout = 'horizontal' 
                form = {form}
                initialValues = {{
                    layout: 'horizontal'
                }}
            >
                <Form.Item>
                    <h1 class="text-center">Đăng ký mượn sách (Chưa hoàn thiện)</h1>
                </Form.Item>
                <Form.Item name="userSection">
                    <h2 class="text-center">Thông tin cá nhân</h2>
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
                
                <Form.Item {...formItemLayout} label = "Họ và tên đệm" name = "firstName"
                    rules={[{
                        required: true,
                        message: "Vui lòng nhập thông tin Họ và tên đệm"
                        }]}
                >
                    <Input placeholder="VD. Lê Anh" disabled={true}/>                           
                </Form.Item>

                <Form.Item {...formItemLayout} label = "Tên" name = "lastName"
                    rules={[{
                        required: true,
                        message: "Vui lòng nhập thông tin Tên"
                        }]}
                >
                    <Input placeholder="VD. Thành" disabled={true}/>                           
                </Form.Item>
    
                <Form.Item {...formItemLayout} label = "Ngày sinh" name = "birthday"
                    rules={[{
                        required: true,
                        message: "Vui lòng chọn ngày"
                    }]}
                >
                    <Input placeholder="VD. 01-01-2000" disabled={true}/>                          
                </Form.Item>

                <Form.Item {...formItemLayout} label = "Lớp" name = "class"
                    rules={[{
                        required: true,
                        message: "Vui lòng nhập thông tin lớp học"
                    }]}
                >
                    <Input placeholder="VD. KHMT-01" disabled={true}/>                           
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type = "primary" onClick= {validate}>
                        Kiểm tra thông tin
                    </Button>
                    <Button type = "danger" onClick= {cancel}>
                        Xóa thông tin
                    </Button>                             
                </Form.Item>

                
          <Divider dashed>Cho mượn sách</Divider>
          <DynamicField
            {...form}
           />
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }

export default App;