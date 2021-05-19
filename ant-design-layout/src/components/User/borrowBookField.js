import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Form, Divider, Button, Select, Input, InputNumber, notification } from 'antd'
import { useState } from 'react';
import bookApi from '../../api/bookApi'

function DynamicField(props) {

    const getBookInfo = async(data) => {
        var id = data.target.value;
        var book_element_res = await bookApi.getListAllBooksElement(id);
        var book_res = await bookApi.getListAllBooks(book_element_res['rootBook']);
        // book res -> Render to title,genre,author
    }

    return (
      <Form.List name="fields">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field, index) => (
                <div key={field.key}>
                  <Divider>Sách {index + 1}</Divider>
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
            </div>
          );
        }}
      </Form.List>
    );
}

export default DynamicField;