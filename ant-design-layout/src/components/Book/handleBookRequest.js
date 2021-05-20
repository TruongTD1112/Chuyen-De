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
            title: "Kiểu sách",
            dataIndex: "code",
            key: "code"
        },
        {
            title: "Người thuê",
            dataIndex : "userId",
            key: "uerId"
        },
        {
            title: "Lớp",
            dataIndex: "class",
            key: "class"
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
                  <Popconfirm title="Xác nhận?" onConfirm = {(e, record) => handle(record)} >
                    <a>Delete</a>
                  </Popconfirm>
            ) 
        },
    ]

    const handle = async (record) => {
        let data = {
            userId: record.userId,
            bookElementId: record._id,
            code : record.code
        }
        try{
            await bookApi.handleBookRequest(data);
        }
        catch(err){
            throw(err);
        }
    }
    const getData = async () => {
        let result = await bookApi.getDataRegister();
        let res = result.map(item =>  {
            return {
            _id : item._id,
            //userId: item.user._id, 
            //class : item.user.class,
            }
        });
        setData([...res]);
    }

    useEffect(async () => {
        // setData(fakeData);
        await getData();
      }, []);
    

    return (
        <Table dataSource = {data} columns = {columns}/>
    )
}

export default HandelBookRequest