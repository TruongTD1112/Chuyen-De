import React from 'react';
import {useEffect, useState} from 'react';
import {Form, Input, Button, Select} from 'antd';
import bookApi from '../../api/bookApi';
const { Option } = Select;
function ImportBook(props) {
        //formRef = React.createRef();
        const [title, setTitle] = useState('');
        const [author, setAuthor] = useState('');
        const [genre, setGenre] = useState('');
        const [amount, setAmount] = useState('');
        const [code, setCode] = useState('');
    
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
              offset: 11,
              span: 22,
            },
          };
          const tailLayout1 = {
            wrapperCol: {
              offset: 11,
              span: 22,
            },
          };
        // onsubmit = () => {
        //     data = {
        //         "title": title,
        //         "author": author,
        //         "genre": genre,
        //         "amount": amount,
        //         "code": code
        //     }
        //     bookApi.importBook(data);
        // }
        return (
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
                    <Input placeholder="VD.100"/>                           
                </Form.Item>

                <Form.Item {...formItemLayout} label = "Mã sách" name = "code"
                    rules={[{
                        required: true,
                    }]}
                >
                    <Input placeholder="VD.THDC"/>                           
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type = "primary">
                        Save
                    </Button>             
                    <Button htmlType="button">
                          Cancel
                    </Button>                 
                </Form.Item>
                

            </Form>
        );
    }

export default ImportBook;