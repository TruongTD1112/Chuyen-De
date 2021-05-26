import React, {useState, useEffect} from 'react';
import {Table, Popconfirm, notification} from 'antd';
import bookApi from '../../api/bookApi';

function ListUserRent(){

    const [data, setData] = useState([]);
    const columns = [
        {
            title: "STT",
            dataIndex : "index",
            //key: "index"
        },

        {
            title: "Mã Sách",
            dataIndex : "_id",
            //key: "_id"
        },
        {
            title: "Kiểu sách",
            dataIndex: "code",
            //key: "code"
        },
        {
            title: "Người thuê",
            dataIndex : "userId",
            //key: "userId"
        },
        {
            title: "Lớp",
            dataIndex: "class",
            //key: "class"
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
            render: (index) => (
                  (<div>
                  <Popconfirm title="Xác nhận?" onConfirm = {() => handle(index)} >
                    <a>Trả sách</a>
                  </Popconfirm>
                  </div>)

            ) 
        },
    ]

    const handle = async (index) => {
        try{
            notification.success({message: "Trả sách thành công"});
            //console.log(data);
            console.log(index)
            await bookApi.retreiveBook({
                "bookId" : index._id,
                "userId" : index.userId
            });
        }
        catch(err){
            throw(err);
        }
    }
    const getData = async () => {
        let result = await bookApi.getBookRent();
        // let res = result.filter((item) => item.user !== null);
        // console.log(res);

        let res = result.map((item, index) =>  {
            return {
            index: ++index,
            _id : item._id,
            code : item.code,
            // userId: (item.user.firstName + " " + item.user.lastName), 
            userId: (item.user.firstName + " " + item.user.lastName),
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