import React, {useState, useEffect} from 'react';
import {Table, Popconfirm, notification} from 'antd';
import bookApi from '../../api/bookApi';
function HandleBookRequest(){

    const [data, setData] = useState([]);
    const columns = [
        {
            title: "STT",
            dataIndex : "index",
            //key: "index"
        },
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
            dataIndex : "userName",
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
                  <Popconfirm title="Xác nhận?" onConfirm = {() => handle(record)} >
                    <a>Xác nhận </a>
                    <a>Hủy </a>
                  </Popconfirm>
            ) 
        },
    ]

    const handle = async (record) => {
        console.log(record);
        let data = {
            "userId": record.userId,
            "bookElementId": record._id,
            "code" : record.code
        }
        try{
            notification.success({message : "Sách được cho thuê thành công"});
            await bookApi.handleBookRequest(data);
        }
        catch(err){
            throw(err);
        }
    }
    const getData = async () => {
        let result = await bookApi.getDataRegister();
        console.log(result);
        // let res = result.filter((item) => item.user !== null);
        // console.log(res);
        let res = result.filter(item => item.user !== null);
        res = res.map((item, index) =>  {
            return {
            index: ++index,
            _id : item._id,
            code : item.code,
            userName: (item.user.firstName + " " + item.user.lastName), 
            userId: item.user._id,
            class : item.user.class,
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

export default HandleBookRequest