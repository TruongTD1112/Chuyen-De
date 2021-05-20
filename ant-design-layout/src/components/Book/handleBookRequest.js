import React, {useState, useEffect} from 'react';
import {Table, Popconfirm} from 'antd';
import bookApi from '../../api/bookApi';
function HandelBookRequest(){

    const [data, setData] = useState([]);
    const columns = [
        {
            title: "Sách",
            dataIndex : "_id",
            key: "_id"
        },
        {
            title: "Người thuê",
            dataIndex : "userId",
            key: "uerId"
        },
        {
            title: "Thời gian",
            dataIndex: "time",
            key: "time"
        },
        {
            title: "Hành động",
            dataIndex: "",
            // render: (record) => (
            //     <Space>
            //         <a onClick = {() => {
            //             bookApi.exportBook({"bookId" : record._id})
            //         }}>Delete</a>
            //     </Space>
            // ),
            render: (record) => (
                  <Popconfirm title="Xác nhận?" onConfirm = {(e) => handle(record, record.key)}>
                    <a>Delete</a>
                  </Popconfirm>
            ) 
        },
    ]


    useEffect(async () => {
        // setData(fakeData);
        await getData();
      }, []);

    const getData = () => {

    }
    
}