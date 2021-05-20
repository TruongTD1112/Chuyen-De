import React, {useState, useEffect} from 'react';
import {Table, Popconfirm} from 'antd';
import bookApi from '../../api/bookApi';
function ListUserRent(){

    const [data, setData] = useState([]);
    const columns = [
        {
            title: "Mã Sách",
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
            key: "userId"
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
            render: (record, index) => (
                  (<div>
                  <Popconfirm title="Xác nhận?" onConfirm = {(e) => handle(record, index)} >
                    <a>Xác nhận cho thuê       </a>
                  </Popconfirm>
                  <Popconfirm title="Xác nhận?" onConfirm = {(e, record) => handle(record)} >
                  <a>  Hủy</a>
                </Popconfirm>
                  </div>)

            ) 
        },
    ]

    const handle = async (record, index) => {
        try{
            let currentData = data;
            currentData.splice(index, 1);
            setData([...currentData]);
            console.log(currentData);

            let dataEachRow = {
                "userId": record.userId,
                "bookElementId": record._id,
                "code" : record.code
            }
            console.log(dataEachRow);
            await bookApi.handleBookRequest(dataEachRow);
        }
        catch(err){
            throw(err);
        }
    }
    const getData = async () => {
        let result = await bookApi.getDataRegister();
        let res = result.filter((item) => item.user !== null);
        console.log(res);
        res = result.map(item =>  {
            if(item.user === null) return;
            return {
            _id : item._id,
            code : item.code,
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

export default ListUserRent;