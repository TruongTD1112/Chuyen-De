import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Form, Divider, Button, Select, Input, InputNumber, notification } from 'antd'

function DynamicField(props) {
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
                    <Input placeholder="" />
                  </Form.Item>
                  <Form.Item
                    label="Title"
                    name={[index, "Title"]}
                  >
                    <Input placeholder="Harry Potter" disabled={true}/>
                  </Form.Item>
                  <Form.Item name={[index, "Genre"]} label="Genre">
                  <Input placeholder="Fantasy" disabled={true}/>

                  </Form.Item>
                  <Form.Item name={[index, "Author"]} label="Author">
                  <Input placeholder="J.K.Rowlings" disabled={true}/>
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