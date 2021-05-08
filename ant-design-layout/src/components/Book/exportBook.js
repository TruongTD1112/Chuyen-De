import React, {useEffect, useState} from 'react';
import bookApi from '../../api/bookApi';
import {Table, Button} from 'antd';
function ExportBook (){
    // const onClick = () => {
    //     list = [];
    //     bookApi.exportBook(list);
    // }

    const [data, setData] = useState([]);
    //const [dataEachRow, setDataEachRow] = useState([]);

    const columnsEachRow = [
        {
            title: "Mã từng cuốn sách",
            dataIndex: "_id",
            key: "idEachBook",
            //sorter: (a, b) => a.name.length - b.name.length
        },
        {
            title: "Tình trạng sử dụng",
            dataIndex: "status",
            key: "status"
        },
        {
            title: "Người thuê",
            dataIndex: "user",
            key: "user"
        }
    ]

    const columns = [
        {
            title: "Tên sách",
            dataIndex: "title",
            key: "title",
            //sorter: (a, b) => a.name.length - b.name.length
        },
        {
            title: "Tác giả",
            dataIndex: "author",
            key: "author",
            //sorter: (a, b) => a.description.length - b.description.length,
        },
        {
            title: "Thể loại",
            dataIndex: "genre",
            key: "genre",
            //sorter: (a, b) => a.typeName.length - b.typeName.length,
        },
        {
            title: "Mã sách",
            dataIndex: "code",
            key: "code",
            //sorter: (a, b) => a.typeName.length - b.typeName.length
        },
        {
          title: "Số lượng",
          dataIndex: "amount",
          key: "amount",
          //sorter: (a, b) => a.description.length - b.description.length,
      },
    ]

    const getData = async () => {
        let res = await bookApi.getListAllBooks();
        //console.log(res);
        let resData = res.map((item, index) => {
          const listBook = item.listBook;

          return {
            ...item, 
            key: item._id
            // type: item.type._id,
            // typeName: item.type.name,
            // key: index,
          };
        });
        //console.log(res);
        setData(resData);

        let resDataEachColumn =  res.map((item, index) => {
            return {
                
            }
        });
        // if (res.photo) setImageUrl(res.photo);
        // setData(resData);
    };
    useEffect(async () => {
      // setData(fakeData);
      await getData();
    });



    return(
        <Table

          columns={columns}
          expandable={{
            expandedRowRender: async (record) => {
                const dataEachRow = await bookApi.getByListID({"list_id" : record.listBook});
                //console.log(dataEachRow);
            return (
             <Table  
                columns= {columnsEachRow} 
                dataSource = {dataEachRow}
             />
            )
            // console.log(record.author);
            //  return (<p>{record.author}</p>)
            }
            // rowExpandable: record => record.expandable
            }}
          dataSource={data}
        />
    )
}

export default ExportBook;