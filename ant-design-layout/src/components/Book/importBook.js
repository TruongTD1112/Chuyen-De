import React from 'react';
import {useEffect, useState} from 'react';
import {Form, Input, Button, Select, InputNumber, Alert} from 'antd';
import bookApi from '../../api/bookApi';
import SweetAlert from "react-bootstrap-sweetalert";
import swal from 'sweetalert'
const { Option } = Select;
function ImportBook() {
        const [form] = Form.useForm();
        const formItemLayout = {
            labelCol: {
              span: 8,
            },
            wrapperCol: {
              span: 8,
            },
          };
          const tailLayout = {
            wrapperCol: {
              offset: 10,
              span: 20,
            },
          };
          const tailLayout1 = {
            wrapperCol: {
              offset: 11,
              span: 22,
            },
          };

        var listCodeBook = "";
        const submit= async () => {
            try{
                var data = form.getFieldsValue(['author', 'title', 'amount', 'genre', 'code']);
                var res = await bookApi.importBook(data);

                console.log(res);
                for(let i= 0; i< res.length; i++){
                    listCodeBook += "Mã sách thứ " + (i+1) + " được tạo:        " + res[i]._id + "\n"
                }
                console.log(listCodeBook);
                setTimeout(swal("Các mã sách được tạo", listCodeBook, "success"));
                form.resetFields(['author', 'title', 'amount', 'genre', 'code']);
            }
            catch(err){
                console.log(err);
            }

            
            form.resetFields(['author', 'title', 'amount', 'genre', 'code']);

            // var data = form.getFieldsValue(['author', 'title', 'amount', 'genre', 'code']);
            // console.log(data);
        }
        
        const cancel = () => {
            form.resetFields(['author', 'title', 'amount', 'genre', 'code']);

        }

        return (
            <div>
                <h1 class="text-center">Nhập kho sách</h1>
            <Form 
                layout = 'horizontal' 
                form = {form}
                initialValues = {{
                    layout: 'horizontal'
                }}
            >
                <Form.Item {...formItemLayout} label = "Tên sách" name = "title"  
                    rules={[{
                            required: true,
                        }]}
                >
                    <Input placeholder="VD. Tin học đại cương"/>                           
                </Form.Item>
    
                <Form.Item {...formItemLayout} label = "Tác giả" name = "author"
                    rules={[{
                        required: true,
                        }]}
                >
                    <Input placeholder="VD. Trần Đình Trường"/>                           
                </Form.Item>
    
                <Form.Item {...formItemLayout} label = "Thể loại" name = "genre"
                    rules={[{
                        required: true,
                    }]}
                >
                    <Select
                        placeholder="Chọn thể loại"
                        // onChange={onGenderChange}
                        // allowClear
                        >
                        <Option value="Đại cương">Đại cương</Option>
                        <Option value="Chuyên ngành">Chuyên ngành</Option>
                        <Option value="Bổ trợ xã hội">Bổ trợ xã hội</Option>
                    </Select>                        
                </Form.Item>
    
                <Form.Item {...formItemLayout} label = "Số lượng" name = "amount"
                    rules={[{
                        required: true,
                    }]}
                >
                    <InputNumber min= {1} />                          
                </Form.Item>

                <Form.Item {...formItemLayout} label = "Mã sách" name = "code"
                    rules={[{
                        required: true,
                    }]}
                >
                    <Input placeholder="VD.THDC"/>                           
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type = "primary" onClick={submit}>
                        Save
                    </Button>             
                    <Button htmlType="button" onClick = {cancel} >
                          Cancel
                    </Button>                 
                </Form.Item>
                

            </Form>
        </div>
        );
    }

export default ImportBook;