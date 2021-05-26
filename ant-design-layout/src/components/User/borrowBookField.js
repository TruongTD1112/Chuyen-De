import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Form, Divider, Button, Select, Input, InputNumber, notification } from 'antd'
import { useState } from 'react';
import bookApi from '../../api/bookApi'



function DynamicField(props) {
    const email = props.email;
    var total = 0;
    const getBookInfo = async(data) => {
        var id = data.target.value;
        var book_element_res = await bookApi.getInfoBook(id);
        var book_res = await bookApi.getListAllBooks(book_element_res['rootBook']);
        // book res -> Render to title,genre,author
    }
    const tailLayout = {
      wrapperCol: {
        offset: 5,
        span: 14,
      },
    };

    const [form] = Form.useForm();
    
    const validate = async (index) => {
      var resData = form.getFieldsValue([index, "Book_element_ID"]);
      var data = resData[index].Book_element_ID
      console.log(data);

      try{
          if (data == null) {
              notification.error({message : "Vui lòng nhập id  của sách"});
          }
          else {
              let resData = await bookApi.getInfoBook({"bookID" : data});
              console.log(resData);
              if(resData.status == "null") notification.error({message: "Không tìm thấy sách"});
              else if(resData.status == "pending") notification.error({message : "Sách đã có người đặt"});
              else if(resData.status == "rent") notification.error({message : "Sách đã có người mượn"});
              else{
                notification.success({message : "Kiểm tra sách thành công"});
                console.log(resData);
                form.setFieldsValue({
                  [index] : {'Author' : resData.author}});
                form.setFieldsValue({
                  [index] : {'Genre' : resData.genre}});
                form.setFieldsValue({
                  [index] : {'Title' : resData.title}});
                // form.setFieldsValue([index, "Author"])[index] = resData.author;
                // form.setFieldsValue([index, "Genre"])[index] = resData.genre
              }
          }
      }
      catch(err){
          if(err == null) notification.error({message : "Không tìm thấy sách nào"});
      }
     }


    const submit = async () => {
      // console.log(props);
      // console.log(email.email);
      var listIDBook = [];
      for(let i= 0; i< total; i++){
        let resData = form.getFieldsValue([i, "Book_element_ID"]);
        let id = resData[i].Book_element_ID
         //let id = form.getFieldsValue([i, "Book_element_ID"]).Book_element_ID;
         listIDBook.push(id);
      }
      console.log(listIDBook);
      try{
         console.log(email.email);
         notification.success({message: "Thuê thành công"});
         await bookApi.rentBook({"email": email.email, "listIDBook": listIDBook});
      }
      catch(err){
        throw err;
      }

    }
    return (
      <div>
      <Form.List name="fields">
        {(fields, { add, remove }) => {
          total = fields.length;
          return (
            <div>
              {fields.map((field, index) => (
                <div key={field.key}>
                  <Divider>Sách {index + 1}</Divider>
                  <Form form = {form}>
                  <Form.Item
                    name={[index, "Book_element_ID"]}
                    label="Book_Element_ID"
                    rules={[{ required: true }]}
                  >
                    <Input onChange = {getBookInfo}/>
                  </Form.Item>
                  <Form.Item
                    label="Title"
                    name={[index, "Title"]}
                  >
                    <Input placeholder = "Chưa có thông tin"/>
                  </Form.Item>
                  <Form.Item name={[index, "Genre"]} label="Genre">
                  <Input placeholder = "Chưa có thông tin"/>

                  </Form.Item>
                  <Form.Item name={[index, "Author"]} label="Author">
                  <Input placeholder = "Chưa có thông tin" />
                  </Form.Item>
                  <Form.Item >
                    <Button type = "primary" onClick = {(e) => validate(index)}>
                        Kiểm tra thông tin
                    </Button>
                             
                </Form.Item>
                </Form>
                  {fields.length > 1 ? (
                  
                    <Button
                      type="danger"
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                      icon={<MinusCircleOutlined />}
                    >
                      Remove Above Field
                    </Button>
                  ) : null}
                  <a on></a>
                </div>

              ))}
              <Divider />
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{ width: "60%" }}
                >
                  <PlusOutlined /> Mượn thêm sách
                </Button>
              </Form.Item>
              <Form.Item>
            <Button type="primary" htmlType="submit" onClick = {() => {submit()}}>
              Submit
            </Button>
      </Form.Item>
            </div>
          );
        }}
      </Form.List>
      </div>
    );
}

export default DynamicField;