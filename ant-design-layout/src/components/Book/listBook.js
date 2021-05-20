import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Input,
  InputNumber,
  Popconfirm,
  Space,
  Table,
  Tag,
  Modal,
  Form,
  Column,
  Select,
  Switch,
} from "antd";

import bookApi from '../../api/bookApi';

function ListBooks(props) {
    //const [pagination, setPagination] = useState({ pageSize: 5, current: 1 });
    //const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    // const [searchText, setSearchText] = useState("");
    // const [searchedColumn, setSearchedColumn] = useState("");
    // const [isModalVisible, setIsModalVisible] = useState(false);
    // const [action, setAction] = useState("Sửa thông tin");
    // const [editId, setEditId] = useState("");

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
        console.log(res);
        let resData = res.map((item, index) => {
          return {
            ...item
            // type: item.type._id,
            // typeName: item.type.name,
            // key: index,
          };
        });
        //console.log(res);
        setData(resData);
        // if (res.photo) setImageUrl(res.photo);
        // setData(resData);
    };
    useEffect(async () => {
      // setData(fakeData);
      await getData();
    }, []);
    
    return(
        <Table
          columns={columns}
          dataSource={data}
        />
    )
}

export default ListBooks;
